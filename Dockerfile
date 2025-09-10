# Multi-Agent DSL Framework Docker Configuration

# 后端服务
FROM python:3.9-slim as backend

# 设置工作目录
WORKDIR /app

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 复制依赖文件
COPY requirements.txt .

# 安装Python依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY backend/ ./backend/
COPY core/ ./core/
COPY dsl/ ./dsl/
COPY runtime/ ./runtime/
COPY agents/ ./agents/
COPY utils/ ./utils/

# 设置环境变量
ENV PYTHONPATH=/app
ENV ENVIRONMENT=production
ENV HOST=0.0.0.0
ENV PORT=8008

# 暴露端口
EXPOSE 8008

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8008/health || exit 1

# 启动命令
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8008"]

# 前端服务
FROM node:16-alpine as frontend

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY frontend/package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY frontend/ ./

# 构建应用
RUN npm run build

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3001

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["npm", "start"]

# 多阶段构建 - 最终镜像
FROM nginx:alpine as final

# 复制前端构建文件
COPY --from=frontend /app/build /usr/share/nginx/html

# 复制nginx配置
COPY docker/nginx.conf /etc/nginx/nginx.conf

# 复制后端服务
COPY --from=backend /app /app

# 安装Python运行时
RUN apk add --no-cache python3 py3-pip

# 安装Python依赖
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# 复制启动脚本
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

# 设置环境变量
ENV PYTHONPATH=/app
ENV ENVIRONMENT=production

# 暴露端口
EXPOSE 80 8008

# 启动脚本
CMD ["/start.sh"]
