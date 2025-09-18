# 企业级多智能体DSL框架部署指南
# Enterprise Multi-Agent DSL Framework Deployment Guide

## 🏢 企业级功能特性

### ✅ 已实现的企业级功能：

1. **API密钥管理系统**
   - 支持多种API服务配置（DeepSeek、OpenAI、OpenWeather等）
   - 实时API密钥验证
   - 安全的密钥存储和管理
   - 一键清除和重置功能

2. **企业级仪表板**
   - 实时系统监控
   - 性能指标展示
   - 智能体状态监控
   - 系统健康检查
   - 自动建议和优化提示

3. **用户设置中心**
   - 多标签页设置界面
   - API配置管理
   - 安全设置（预留）
   - 账户管理（预留）
   - 通知设置（预留）

4. **安全特性**
   - 无硬编码API密钥
   - 环境变量安全配置
   - API密钥哈希存储
   - 跨域安全配置

## 🚀 快速部署

### 环境要求
- **Python**: 3.8+ (推荐 3.9+)
- **Node.js**: 16+ (推荐 18+)
- **内存**: 4GB+ (推荐 8GB+)
- **存储**: 2GB+ 可用空间

### 1. 获取项目
```bash
git clone https://github.com/Max-YUAN-22/Final-DSL.git
cd Final-DSL
```

### 2. 安装依赖
```bash
# Python依赖
pip install -r requirements.txt

# Node.js依赖
cd frontend
npm install
cd ..
```

### 3. 启动服务
```bash
# 启动后端服务
python -m backend.main

# 启动前端服务 (新终端)
cd frontend
PORT=3001 npm start
```

### 4. 访问系统
- **智能体交互界面**: http://localhost:3001 (原有的DSL多智能体交互功能)
- **企业仪表板**: http://localhost:3001/dashboard (系统监控和性能指标)
- **系统设置**: http://localhost:3001/settings (API配置和系统管理)

## 🔧 API密钥配置

### 支持的API服务

1. **DeepSeek API**
   - 用途：智能对话和文本生成
   - 获取：https://platform.deepseek.com/
   - 配置：在设置页面输入API密钥

2. **OpenAI API**
   - 用途：GPT模型调用
   - 获取：https://platform.openai.com/
   - 配置：在设置页面输入API密钥

3. **OpenWeather API**
   - 用途：天气数据获取
   - 获取：https://openweathermap.org/api
   - 配置：在设置页面输入API密钥

4. **Google Maps API**
   - 用途：地图和位置服务
   - 获取：https://developers.google.com/maps
   - 配置：在设置页面输入API密钥

5. **Alpha Vantage API**
   - 用途：金融数据获取
   - 获取：https://www.alphavantage.co/
   - 配置：在设置页面输入API密钥

### 配置步骤
1. 访问 http://localhost:3001/settings
2. 选择"API配置"标签页
3. 输入相应的API密钥
4. 点击"验证"按钮测试连接
5. 点击"保存配置"完成设置

## 📊 企业仪表板功能

### 实时监控
- **系统状态**: 显示系统健康状态
- **智能体状态**: 监控活跃智能体数量
- **API配置状态**: 显示已配置的服务数量
- **性能指标**: 实时响应时间和吞吐量

### 性能指标
- **请求/分钟**: 系统处理请求的频率
- **平均响应时间**: API调用的平均延迟
- **错误率**: 系统错误发生的比例
- **缓存命中率**: 缓存系统的效率

### 系统建议
- 自动检测配置问题
- 提供优化建议
- 一键跳转到设置页面

## 🔒 安全最佳实践

### 生产环境部署
1. **环境变量配置**
   ```bash
   export DEEPSEEK_API_KEY="your_deepseek_key"
   export OPENAI_API_KEY="your_openai_key"
   export OPENWEATHER_API_KEY="your_openweather_key"
   ```

2. **HTTPS配置**
   - 使用SSL证书
   - 配置反向代理（Nginx/Apache）
   - 启用安全头部

3. **访问控制**
   - 配置防火墙规则
   - 限制API访问频率
   - 实施用户认证（可选）

### 数据安全
- API密钥通过环境变量管理
- 敏感数据不存储在数据库中
- 支持密钥轮换和更新

## 🛠️ 故障排除

### 常见问题

1. **API密钥验证失败**
   - 检查密钥格式是否正确
   - 确认API服务是否可用
   - 检查网络连接

2. **服务启动失败**
   - 检查端口是否被占用
   - 确认依赖包是否完整安装
   - 查看错误日志

3. **性能问题**
   - 监控系统资源使用
   - 检查API调用频率
   - 优化缓存配置

### 日志查看
```bash
# 后端日志
python -m backend.main 2>&1 | tee backend.log

# 前端日志
cd frontend && npm start 2>&1 | tee frontend.log
```

## 📈 扩展功能

### 计划中的企业级功能
- [ ] 用户认证和授权
- [ ] 多租户支持
- [ ] 数据持久化
- [ ] 审计日志
- [ ] 负载均衡
- [ ] 容器化部署
- [ ] 监控告警
- [ ] 备份恢复

### 自定义开发
- 支持自定义智能体
- 可扩展的API接口
- 插件化架构
- 主题定制

## 📞 技术支持

### 获取帮助
- 查看项目文档
- 提交Issue到GitHub
- 联系技术支持团队

### 企业支持
- 定制化开发服务
- 技术咨询服务
- 培训和支持服务

---

**企业级多智能体DSL框架** - 为您的业务提供智能化的多智能体解决方案
