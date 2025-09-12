import asyncio
import json
import sys
import os

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from dependencies import get_dsl_instance
from dsl_workflows import smart_city_simulation_workflow, generate_report_workflow
from socket_app import sio, start_cleanup_task
from api_routes import router
import socketio

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 包含API路由
app.include_router(router)

# 添加健康检查端点
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Multi-Agent DSL Framework is running"}

dsl = get_dsl_instance()

sio_app = socketio.ASGIApp(sio)
app.mount("/socket.io", sio_app)

# 启动清理任务
@app.on_event("startup")
async def startup_event():
    await start_cleanup_task()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8008)