# backend/socket_app.py
import asyncio
import json
import socketio
from fastapi import APIRouter
from websocket_manager import manager
from websocket_connection_manager import connection_manager
from dsl_workflows import smart_city_simulation_workflow, generate_report_workflow
from dependencies import get_dsl_instance
import logging

logger = logging.getLogger(__name__)

router = APIRouter()
sio = socketio.AsyncServer(
    async_mode='asgi', 
    cors_allowed_origins="*",
    logger=True,
    engineio_logger=True,
    always_connect=True,
    ping_timeout=60,
    ping_interval=25
)

@sio.on('*')
async def catch_all(event, sid, data):
    print(f'Received event "{event}" from {sid} with data: {data}')

@sio.event
async def connect(sid, environ):
    logger.info(f"客户端连接: {sid}")
    
    # 从请求头获取用户信息（如果有的话）
    user_id = environ.get('HTTP_USER_ID') or environ.get('QUERY_STRING', '').split('user_id=')[1].split('&')[0] if 'user_id=' in environ.get('QUERY_STRING', '') else None
    
    # 创建用户会话
    session = await connection_manager.create_session(sid, user_id)
    
    # 发送连接成功消息
    await sio.emit('connection_successful', {
        'data': 'Connected',
        'session_id': session.session_id,
        'user_id': session.user_id,
        'connected_at': session.connected_at.isoformat(),
        'server_stats': connection_manager.get_stats()
    }, room=sid)
    
    # 将客户端加入默认房间以便广播
    await sio.enter_room(sid, 'default_room')
    
    # 如果用户ID存在，也加入用户专用房间
    if user_id:
        await sio.enter_room(sid, f'user_{user_id}')
    
    logger.info(f"会话创建成功: {session.session_id}, 用户: {user_id}")

@sio.event
async def disconnect(sid):
    logger.info(f"客户端断开连接: {sid}")
    
    # 移除用户会话
    await connection_manager.remove_session(sid)
    
    # 发送断开连接统计信息
    await sio.emit('server_stats', connection_manager.get_stats(), room='default_room')

@sio.event
async def message(sid, data):
    logger.info(f"收到消息 from {sid}: {data}")
    
    # 更新会话活动时间
    await connection_manager.update_activity(sid)
    
    try:
        if isinstance(data, str):
            data = json.loads(data)
        
        logger.info(f"解析消息数据: {data}")
        
        task_type = data.get('type')
        logger.info(f"任务类型: {task_type}")

        task_data = data.get('data', {})

        dsl = get_dsl_instance()

        if task_type == "smart_city_simulation":
            logger.info("执行智能城市模拟工作流")
            # 确保传递正确的参数格式
            entry_point = task_data.get('entry_point')
            if entry_point:
                asyncio.create_task(smart_city_simulation_workflow(dsl, entry_point, task_data))
            else:
                logger.warning("任务数据中未指定entry_point")
        elif task_type == 'generate_report':
             logger.info("执行报告生成工作流")
             asyncio.create_task(generate_report_workflow(dsl))
        else:
            logger.warning(f"未知消息类型: {task_type}")
    
    except json.JSONDecodeError as e:
        logger.error(f"解析消息数据失败: {e}")
    except Exception as e:
        logger.error(f"处理消息时出错: {e}")
# 添加定期清理任务
async def cleanup_task():
    """定期清理非活跃会话"""
    while True:
        try:
            await connection_manager.cleanup_inactive_sessions()
            await asyncio.sleep(300)  # 每5分钟清理一次
        except Exception as e:
            logger.error(f"清理任务出错: {e}")
            await asyncio.sleep(60)  # 出错后等待1分钟再重试

# 清理任务将在应用启动时启动
async def start_cleanup_task():
    """启动清理任务"""
    asyncio.create_task(cleanup_task())
