import asyncio
import json
from typing import Dict, Any
from backend.dependencies import get_dsl_instance, get_websocket_manager
from dsl.dsl import DSL

dsl = get_dsl_instance()

async def broadcast_message_task(dsl: DSL, message: Any):
    """Broadcasts a message to all connected Socket.IO clients."""
    from backend.socket_app import sio
    try:
        if isinstance(message, str):
            # Wrap raw strings in a structured JSON object
            await sio.emit('broadcast', {
                "type": "simulation_log",
                "title": "Simulation Log",
                "payload": {"details": message},
                "timestamp": asyncio.get_event_loop().time()
            }, room='default_room')
        elif isinstance(message, dict):
            # Ensure timestamp is present
            if 'timestamp' not in message:
                message['timestamp'] = asyncio.get_event_loop().time()
            # Send dictionaries as-is
            await sio.emit('broadcast', message, room='default_room')
        else:
            # Log an error for unhandled types
            print(f"Cannot broadcast message of unknown type: {type(message)}")
    except Exception as e:
        print(f"Error broadcasting message: {e}")
        import traceback
        traceback.print_exc()

async def fire_alert_workflow_task(dsl: DSL, event_data: dict):
    """Workflow for handling fire alerts."""
    dsl.gen(
        name="broadcast_fire_alert",
        prompt=f"Broadcasting fire alert: {event_data}",
        agent="broadcast_agent"
    ).schedule()
    
    safety_check_task = dsl.gen(
        name="safety_protocol_check",
        prompt="Confirm all safety protocols are active for a fire emergency.",
        agent="safety_agent"
    ).schedule()

    report_task = dsl.gen(
        name="generate_fire_report",
        prompt=f"Generate a detailed report for the fire event: {event_data}",
        agent="reporting_agent"
    ).schedule()

    await broadcast_message_task(dsl, {
        "type": "fire_alert",
        "title": "Fire Alert",
        "payload": event_data
    })
    
    await asyncio.to_thread(dsl.join, [safety_check_task, report_task], mode="all")

async def traffic_incident_workflow_task(dsl: DSL, event_data: dict):
    """Workflow for handling traffic incidents."""
    dsl.gen(
        name="broadcast_traffic_incident",
        prompt=f"Broadcasting traffic incident: {event_data}",
        agent="broadcast_agent"
    ).schedule()

    reroute_task = dsl.gen(
        name="calculate_optimal_reroute",
        prompt=f"Calculate optimal rerouting for traffic incident at {event_data['location']}",
        agent="traffic_agent"
    ).schedule()

    await broadcast_message_task(dsl, {
        "type": "traffic_incident",
        "title": "Traffic Incident",
        "payload": event_data
    })
    
    await asyncio.to_thread(dsl.join, [reroute_task])

async def master_workflow_chain_task(dsl: DSL, event_data: dict):
    """Workflow for handling weather alerts, which may trigger other workflows."""
    dsl.gen(
        name="broadcast_weather_alert",
        prompt=f"Broadcasting weather alert: {event_data}",
        agent="broadcast_agent"
    ).schedule()

    await broadcast_message_task(dsl, {
        "type": "weather_alert",
        "title": "Weather Alert",
        "payload": event_data
    })
    
    if "fire" in event_data.get("secondary_risks", []):
        fire_event = {
            "location": event_data["area"],
            "details": "Secondary fire risk due to weather conditions."
        }
        await fire_alert_workflow_task(dsl, fire_event)


async def city_analysis_workflow_task(dsl: DSL, city: str):
    """Workflow for city analysis using multiple agents."""
    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": f"Starting analysis for {city}...",
        "title": "City Analysis Workflow"
    })

    planning_task = dsl.gen(
        name="create_analysis_plan",
        prompt=f"Create a plan to analyze the city of {city}.",
        agent="planning_agent"
    ).schedule()
    await asyncio.to_thread(dsl.join, [planning_task])

    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": f"Plan created. Collecting data for {city}...",
        "title": "City Analysis Workflow"
    })

    data_collection_task = dsl.gen(
        name="collect_city_data",
        prompt=f"Collect relevant data for the city of {city}.",
        agent="data_collection_agent"
    ).schedule()
    await asyncio.to_thread(dsl.join, [data_collection_task])

    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": f"Data collected. Generating report for {city}...",
        "title": "City Analysis Workflow"
    })

    report_task = dsl.gen(
        name="generate_city_report",
        prompt=f"Generate a comprehensive analysis report for {city} based on the collected data.",
        agent="reporting_agent"
    ).schedule()
    join_results = await asyncio.to_thread(dsl.join, [report_task])

    report_result = join_results.get(report_task.name)
    report_content = report_result.get("report", "Failed to generate report.") if isinstance(report_result, dict) else str(report_result)

    await broadcast_message_task(dsl, {
        "type": "analysis_report",
        "payload": {"report": report_content},
        "title": "City Analysis Report"
    })


async def smart_city_simulation_workflow(dsl: DSL, entry_point: str, task_data: Dict[str, Any]):
    """
    A dynamic workflow that simulates a smart city environment, allowing for a flexible entry point.
    The workflow is initiated by a starting task and then triggers other agents to react to it.
    """
    print(f"Starting smart city simulation workflow with entry_point: {entry_point}")
    
    # 导入智能体实例
    from backend.dependencies import (
        traffic_manager_agent, weather_agent, parking_agent, safety_agent
    )
    
    # Acknowledge the start of the workflow
    ack_message = f"开始智能城市模拟工作流，入口任务: '{entry_point}'。正在启动模拟..."
    await broadcast_message_task(dsl, {
        "type": "agent_message", 
        "payload": ack_message, 
        "title": "城市管理器",
        "timestamp": asyncio.get_event_loop().time()
    })
    dsl.add_to_history("工作流启动确认", ack_message)

    # Define agent configurations with actual agent instances
    agent_configs = {
        "autonomous_driving_task": {
            "agent": traffic_manager_agent, 
            "title": "自动驾驶系统", 
            "base_prompt": "分析当前自动驾驶状态并制定优化策略"
        },
        "weather_alert_task": {
            "agent": weather_agent, 
            "title": "天气监测系统", 
            "base_prompt": "基于当前天气条件评估城市安全风险"
        },
        "parking_update_task": {
            "agent": parking_agent, 
            "title": "停车管理系统", 
            "base_prompt": "分析停车状况并优化交通流量"
        },
        "safety_inspection_task": {
            "agent": safety_agent, 
            "title": "安全检查系统", 
            "base_prompt": "执行安全检查并评估潜在风险"
        },
    }

    if entry_point not in agent_configs:
        error_message = f"无效的入口任务: {entry_point}"
        await broadcast_message_task(dsl, {"type": "error", "payload": error_message, "title": "错误"})
        print(error_message)
        return

    # Execute the initial task
    start_task_config = agent_configs[entry_point]
    prompt_details = ", ".join([f"{key.replace('_', ' ')}: {value}" for key, value in task_data.items() if key != 'entry_point'])
    initial_prompt = f"初始任务: {start_task_config['title']}，详细信息: {prompt_details}。{start_task_config['base_prompt']}"

    initial_task_execution = dsl.gen(
        name=f"{entry_point}_execution",
        prompt=initial_prompt,
        agent=start_task_config["agent"]
    ).schedule()
    
    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": f"正在执行初始任务: {start_task_config['title']}",
        "title": start_task_config['title'],
        "timestamp": asyncio.get_event_loop().time()
    })
    
    join_results = await asyncio.to_thread(dsl.join, [initial_task_execution])

    initial_result = join_results.get(initial_task_execution.name)
    initial_result_str = str(initial_result.get("result", initial_result) if isinstance(initial_result, dict) else initial_result)

    await broadcast_message_task(dsl, {
        "type": "agent_response",
        "payload": {
            "agent": start_task_config['title'],
            "result": initial_result_str,
            "task": entry_point
        },
        "title": f"{start_task_config['title']} 执行完成",
        "timestamp": asyncio.get_event_loop().time()
    })
    dsl.add_to_history(f"{start_task_config['title']} 执行结果", initial_result_str)

    # Trigger other agents to react with more intelligent interactions
    other_tasks = [task for task in agent_configs if task != entry_point]
    reaction_tasks = []
    
    for other_task_name in other_tasks:
        other_task_config = agent_configs[other_task_name]
        
        # Create more intelligent reaction prompts based on the initial task
        if entry_point == "autonomous_driving_task":
            if other_task_name == "weather_alert_task":
                reaction_prompt = f"基于自动驾驶任务的结果 ({initial_result_str})，评估天气条件对自动驾驶安全的影响，并提供天气预警建议。"
            elif other_task_name == "parking_update_task":
                reaction_prompt = f"基于自动驾驶任务的结果 ({initial_result_str})，分析停车状况对自动驾驶路线规划的影响，并优化停车资源分配。"
            elif other_task_name == "safety_inspection_task":
                reaction_prompt = f"基于自动驾驶任务的结果 ({initial_result_str})，执行安全检查，确保自动驾驶环境的安全性。"
        
        elif entry_point == "weather_alert_task":
            if other_task_name == "autonomous_driving_task":
                reaction_prompt = f"基于天气预警的结果 ({initial_result_str})，调整自动驾驶策略以适应恶劣天气条件。"
            elif other_task_name == "parking_update_task":
                reaction_prompt = f"基于天气预警的结果 ({initial_result_str})，调整停车管理策略，考虑天气对停车的影响。"
            elif other_task_name == "safety_inspection_task":
                reaction_prompt = f"基于天气预警的结果 ({initial_result_str})，加强安全检查，确保恶劣天气下的城市安全。"
        
        elif entry_point == "parking_update_task":
            if other_task_name == "autonomous_driving_task":
                reaction_prompt = f"基于停车更新的结果 ({initial_result_str})，优化自动驾驶路线，避开拥堵区域。"
            elif other_task_name == "weather_alert_task":
                reaction_prompt = f"基于停车更新的结果 ({initial_result_str})，评估停车状况变化对天气应对策略的影响。"
            elif other_task_name == "safety_inspection_task":
                reaction_prompt = f"基于停车更新的结果 ({initial_result_str})，检查停车区域的安全状况。"
        
        elif entry_point == "safety_inspection_task":
            if other_task_name == "autonomous_driving_task":
                reaction_prompt = f"基于安全检查的结果 ({initial_result_str})，调整自动驾驶策略以确保安全。"
            elif other_task_name == "weather_alert_task":
                reaction_prompt = f"基于安全检查的结果 ({initial_result_str})，评估安全风险对天气应对的影响。"
            elif other_task_name == "parking_update_task":
                reaction_prompt = f"基于安全检查的结果 ({initial_result_str})，调整停车管理策略以确保安全。"
        
        else:
            reaction_prompt = f"基于 '{start_task_config['title']}' 任务的结果 ({initial_result_str})，{other_task_config['base_prompt']}"
        
        reaction_task = dsl.gen(
            name=f"{other_task_name}_reaction",
            prompt=reaction_prompt,
            agent=other_task_config["agent"]
        ).schedule()
        reaction_tasks.append((other_task_config['title'], reaction_task))

    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": f"正在触发其他智能体响应，共 {len(reaction_tasks)} 个智能体将参与交互...",
        "title": "智能体协调器",
        "timestamp": asyncio.get_event_loop().time()
    })

    join_results = await asyncio.to_thread(dsl.join, [task for _, task in reaction_tasks], mode="all")

    for title, task in reaction_tasks:
        result = join_results.get(task.name)
        result_str = str(result.get("result", result) if isinstance(result, dict) else result)
        await broadcast_message_task(dsl, {
            "type": "agent_response",
            "payload": {
                "agent": title,
                "result": result_str,
                "triggered_by": start_task_config['title']
            },
            "title": f"{title} 响应完成",
            "timestamp": asyncio.get_event_loop().time()
        })
        dsl.add_to_history(f"{title} 响应结果", result_str)

    # Final coordination message
    final_message = f"智能城市模拟工作流完成！{start_task_config['title']} 触发了 {len(reaction_tasks)} 个智能体的响应，所有交互已完成。"
    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": final_message,
        "title": "城市管理器",
        "timestamp": asyncio.get_event_loop().time()
    })
    dsl.add_to_history("工作流完成", final_message)


async def generate_report_workflow(dsl: DSL, events_data: list = None):
    """
    Workflow to generate a report of the last 5 interactions.
    """
    await broadcast_message_task(dsl, {
        "type": "agent_message",
        "payload": "正在生成基于近五次交互的城市分析报告...",
        "title": "报告生成器",
        "timestamp": asyncio.get_event_loop().time()
    })

    # 使用传入的事件数据或从历史记录获取
    if events_data:
        last_5_interactions = events_data[-5:]
    else:
        history = dsl.get_history() 
        last_5_interactions = history[-5:]

    if not last_5_interactions:
        await broadcast_message_task(dsl, {
            "type": "analysis_report",
            "payload": {"report": "暂无交互记录，无法生成报告。"},
            "title": "城市分析报告",
            "timestamp": asyncio.get_event_loop().time()
        })
        return

    # 构建报告提示
    report_prompt = "基于以下智能城市交互记录，生成一份简洁的城市分析报告，包括主要发现、趋势分析和建议：\n\n"
    for i, interaction in enumerate(last_5_interactions, 1):
        if isinstance(interaction, dict):
            if 'type' in interaction and 'payload' in interaction:
                # 处理WebSocket事件格式
                event_type = interaction.get('type', '未知事件')
                payload = interaction.get('payload', {})
                title = interaction.get('title', '未知标题')
                
                if event_type == 'agent_response':
                    agent = payload.get('agent', '未知智能体')
                    result = payload.get('result', '无结果')
                    report_prompt += f"{i}. {agent} 响应: {result}\n"
                elif event_type == 'agent_message':
                    message = payload if isinstance(payload, str) else str(payload)
                    report_prompt += f"{i}. {title}: {message}\n"
                else:
                    report_prompt += f"{i}. {title}: {str(payload)}\n"
            else:
                # 处理历史记录格式
                prompt = interaction.get("prompt", "未知提示")
                result = interaction.get("result", "无结果")
                report_prompt += f"{i}. {prompt}: {result}\n"
        else:
            report_prompt += f"{i}. {str(interaction)}\n"

    # 导入智能体实例
    from backend.dependencies import weather_agent
    
    report_task = dsl.gen(
        name="generate_city_analysis_report",
        prompt=report_prompt,
        agent=weather_agent
    ).schedule()
    join_results = await asyncio.to_thread(dsl.join, [report_task])

    report_result = join_results.get(report_task.name)
    report_content = report_result.get("report", "报告生成失败。") if isinstance(report_result, dict) else str(report_result)

    await broadcast_message_task(dsl, {
        "type": "analysis_report",
        "payload": {"report": report_content},
        "title": "城市分析报告",
        "timestamp": asyncio.get_event_loop().time()
    })