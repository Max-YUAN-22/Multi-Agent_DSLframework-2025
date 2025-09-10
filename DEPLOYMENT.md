# Multi-Agent DSL Framework 部署指南

## 📋 部署概览

本指南提供了Multi-Agent DSL Framework的完整部署方案，包括本地开发、Docker容器化部署和云平台部署。

## 🚀 快速开始

### 1. 本地开发部署

#### 环境要求
- Python 3.9+
- Node.js 16+
- Redis (可选，用于缓存)

#### 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/Max-YUAN-22/Final-DSL.git
cd Final-DSL

# 2. 安装Python依赖
pip install -r requirements.txt

# 3. 安装前端依赖
cd frontend
npm install
cd ..

# 4. 配置环境变量
cp env.template .env
# 编辑 .env 文件，根据需要修改配置

# 5. 启动服务
# 终端1: 启动后端
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8008

# 终端2: 启动前端
cd frontend
npm start
```

#### 验证部署
- 后端API: http://localhost:8008/health
- 前端界面: http://localhost:3001
- API文档: http://localhost:8008/docs

### 2. Docker部署

#### 单容器部署

```bash
# 构建镜像
docker build -t multi-agent-dsl .

# 运行容器
docker run -p 8008:8008 -p 3001:3001 multi-agent-dsl
```

#### Docker Compose部署

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

#### 服务说明
- **Backend**: http://localhost:8008
- **Frontend**: http://localhost:3001
- **Redis**: localhost:6379
- **Nginx**: http://localhost:80
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000

### 3. 生产环境部署

#### Kubernetes部署

```bash
# 创建命名空间
kubectl create namespace multi-agent-dsl

# 部署配置
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml

# 部署服务
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/nginx-deployment.yaml

# 部署服务
kubectl apply -f k8s/services.yaml

# 部署Ingress
kubectl apply -f k8s/ingress.yaml
```

#### 云平台部署

##### AWS ECS部署

```bash
# 构建并推送镜像到ECR
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-west-2.amazonaws.com

docker build -t multi-agent-dsl .
docker tag multi-agent-dsl:latest 123456789012.dkr.ecr.us-west-2.amazonaws.com/multi-agent-dsl:latest
docker push 123456789012.dkr.ecr.us-west-2.amazonaws.com/multi-agent-dsl:latest

# 创建ECS任务定义和服务
aws ecs create-cluster --cluster-name multi-agent-dsl
aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json
aws ecs create-service --cluster multi-agent-dsl --service-name multi-agent-dsl-service --task-definition multi-agent-dsl:1 --desired-count 2
```

##### Google Cloud Run部署

```bash
# 构建镜像
gcloud builds submit --tag gcr.io/PROJECT-ID/multi-agent-dsl

# 部署到Cloud Run
gcloud run deploy multi-agent-dsl \
  --image gcr.io/PROJECT-ID/multi-agent-dsl \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 🔧 配置说明

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `ENVIRONMENT` | `development` | 运行环境 (development/production/testing) |
| `HOST` | `0.0.0.0` | 服务器绑定地址 |
| `PORT` | `8008` | 服务器端口 |
| `DATABASE_URL` | `sqlite:///./data/app.db` | 数据库连接URL |
| `REDIS_URL` | `redis://localhost:6379` | Redis连接URL |
| `LOG_LEVEL` | `INFO` | 日志级别 |
| `MAX_CONCURRENT_EVENTS` | `1000` | 最大并发事件数 |
| `CACHE_TTL` | `300` | 缓存生存时间(秒) |

### 数据库配置

#### SQLite (开发环境)
```bash
DATABASE_URL=sqlite:///./data/app.db
```

#### PostgreSQL (生产环境)
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/multi_agent_db
```

#### MySQL (生产环境)
```bash
DATABASE_URL=mysql://user:password@localhost:3306/multi_agent_db
```

### Redis配置

#### 本地Redis
```bash
REDIS_URL=redis://localhost:6379
```

#### Redis集群
```bash
REDIS_URL=redis://redis-cluster:6379
```

#### Redis with Auth
```bash
REDIS_URL=redis://:password@localhost:6379
```

## 📊 监控和日志

### 健康检查

```bash
# API健康检查
curl http://localhost:8008/health

# 系统指标
curl http://localhost:8008/metrics
```

### 日志配置

#### 本地日志
```bash
LOG_FILE=./logs/app.log
LOG_LEVEL=INFO
```

#### 结构化日志 (JSON)
```bash
LOG_FORMAT=json
LOG_LEVEL=INFO
```

#### 远程日志 (ELK Stack)
```bash
LOG_HOST=elasticsearch:9200
LOG_INDEX=multi-agent-dsl
```

### 监控指标

#### Prometheus指标
- `http_requests_total`: HTTP请求总数
- `http_request_duration_seconds`: HTTP请求延迟
- `events_processed_total`: 处理的事件总数
- `agent_status`: 智能体状态
- `cache_hit_rate`: 缓存命中率

#### Grafana仪表板
- 系统性能监控
- 业务指标监控
- 错误率监控
- 资源使用监控

## 🔒 安全配置

### HTTPS配置

#### Nginx配置
```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://backend:8008;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### Let's Encrypt证书
```bash
# 安装certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com
```

### 防火墙配置

```bash
# UFW配置
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# iptables配置
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

## 🧪 测试部署

### 运行测试套件

```bash
# 运行所有测试
./run_tests.sh

# 运行特定测试
pytest tests/test_backend_api.py -v
pytest tests/test_performance.py -v -s
```

### 性能测试

```bash
# 使用Apache Bench进行负载测试
ab -n 1000 -c 10 http://localhost:8008/health

# 使用wrk进行性能测试
wrk -t12 -c400 -d30s http://localhost:8008/health
```

## 🚨 故障排除

### 常见问题

#### 1. 端口冲突
```bash
# 检查端口占用
lsof -i :8008
lsof -i :3001

# 杀死占用进程
kill -9 <PID>
```

#### 2. 依赖问题
```bash
# 重新安装依赖
pip install -r requirements.txt --force-reinstall
cd frontend && npm install --force
```

#### 3. 数据库连接问题
```bash
# 检查数据库状态
python -c "import sqlite3; print('SQLite OK')"

# 检查Redis连接
redis-cli ping
```

#### 4. 内存不足
```bash
# 检查内存使用
free -h
ps aux --sort=-%mem | head -10
```

### 日志分析

```bash
# 查看应用日志
tail -f logs/app.log

# 查看Docker日志
docker-compose logs -f backend

# 查看系统日志
journalctl -u multi-agent-dsl -f
```

## 📈 性能优化

### 后端优化

1. **数据库优化**
   - 添加索引
   - 连接池配置
   - 查询优化

2. **缓存优化**
   - Redis缓存策略
   - 内存缓存配置
   - 缓存预热

3. **并发优化**
   - 异步处理
   - 连接池大小
   - 工作进程数

### 前端优化

1. **构建优化**
   - 代码分割
   - 资源压缩
   - CDN配置

2. **运行时优化**
   - 懒加载
   - 虚拟滚动
   - 内存管理

## 🔄 更新和维护

### 版本更新

```bash
# 拉取最新代码
git pull origin main

# 更新依赖
pip install -r requirements.txt --upgrade
cd frontend && npm update

# 重启服务
docker-compose restart
```

### 数据备份

```bash
# 备份数据库
pg_dump multi_agent_db > backup_$(date +%Y%m%d).sql

# 备份Redis
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb backup_redis_$(date +%Y%m%d).rdb
```

### 清理维护

```bash
# 清理Docker资源
docker system prune -a

# 清理日志文件
find logs/ -name "*.log" -mtime +30 -delete

# 清理临时文件
rm -rf tmp/*
```

## 📞 支持

如有部署问题，请：

1. 查看本文档的故障排除部分
2. 检查GitHub Issues: https://github.com/Max-YUAN-22/Final-DSL/issues
3. 提交新的Issue并提供详细的错误信息

---

**部署成功！** 🎉

您的Multi-Agent DSL Framework现在已经可以正常运行了。