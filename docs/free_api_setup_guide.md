# 免费API密钥申请指南

## 🆓 **完全免费的API服务**

### 1. OpenWeatherMap API (天气数据)
**用途**: 获取真实天气数据，包括温度、湿度、能见度等
**免费额度**: 1000次/天
**申请步骤**:
1. 访问: https://openweathermap.org/api
2. 点击 "Sign Up" 注册账号
3. 验证邮箱
4. 登录后进入 "API Keys" 页面
5. 复制生成的API密钥

**设置方法**:
```bash
export OPENWEATHER_API_KEY="your_api_key_here"
```

### 2. Alpha Vantage API (股票数据)
**用途**: 获取真实股票价格和市场数据
**免费额度**: 5次/分钟
**申请步骤**:
1. 访问: https://www.alphavantage.co/support/#api-key
2. 填写邮箱和用途
3. 点击 "GET FREE API KEY"
4. 检查邮箱获取API密钥

**设置方法**:
```bash
export ALPHA_VANTAGE_API_KEY="your_api_key_here"
```

### 3. AirVisual API (空气质量)
**用途**: 获取真实空气质量数据
**免费额度**: 1000次/月
**申请步骤**:
1. 访问: https://www.iqair.com/air-pollution-data-api
2. 点击 "Get Started"
3. 注册账号
4. 在控制台获取API密钥

**设置方法**:
```bash
export AIRVISUAL_API_KEY="your_api_key_here"
```

### 4. VirusTotal API (安全扫描)
**用途**: 扫描URL和IP地址的安全性
**免费额度**: 500次/分钟
**申请步骤**:
1. 访问: https://www.virustotal.com/gui/my-apikey
2. 注册账号
3. 验证邮箱
4. 在个人资料页面获取API密钥

**设置方法**:
```bash
export VIRUSTOTAL_API_KEY="your_api_key_here"
```

## 🔧 **快速设置方法**

### 方法1: 环境变量
```bash
# 在终端中设置
export OPENWEATHER_API_KEY="your_api_key_here"
export ALPHA_VANTAGE_API_KEY="your_api_key_here"
export AIRVISUAL_API_KEY="your_api_key_here"
export VIRUSTOTAL_API_KEY="your_api_key_here"
```

### 方法2: .env文件
```bash
# 创建 .env 文件
echo "OPENWEATHER_API_KEY=your_api_key_here" > .env
echo "ALPHA_VANTAGE_API_KEY=your_api_key_here" >> .env
echo "AIRVISUAL_API_KEY=your_api_key_here" >> .env
echo "VIRUSTOTAL_API_KEY=your_api_key_here" >> .env
```

### 方法3: 系统环境变量
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
echo 'export OPENWEATHER_API_KEY="your_api_key_here"' >> ~/.bashrc
echo 'export ALPHA_VANTAGE_API_KEY="your_api_key_here"' >> ~/.bashrc
echo 'export AIRVISUAL_API_KEY="your_api_key_here"' >> ~/.bashrc
echo 'export VIRUSTOTAL_API_KEY="your_api_key_here"' >> ~/.bashrc
source ~/.bashrc
```

## 🧪 **测试API集成**

### 运行测试脚本
```bash
python3 test_real_api_integration.py
```

### 预期输出
```
🧪 测试真实天气API集成...
📊 API状态: ✅ 已配置
🌤️ 测试获取天气数据...
📍 城市: San Francisco
🌡️ 温度: 18.5°C
💧 湿度: 65%
👁️ 能见度: 10km
📝 描述: 多云
📊 数据来源: OpenWeatherMap API
✅ 真实数据: 是
```

## 💡 **使用建议**

### 优先级设置
1. **OpenWeatherMap** - 最重要，影响所有天气相关功能
2. **Alpha Vantage** - 金融功能需要
3. **AirVisual** - 环境监测功能需要
4. **VirusTotal** - 安全功能需要

### 成本控制
- **免费额度足够日常使用**
- **监控API使用量**
- **设置使用限制**

### 错误处理
- **API密钥无效**: 系统自动回退到模拟数据
- **API限制**: 系统会等待并重试
- **网络错误**: 系统会使用缓存数据

## 🎯 **立即开始**

1. **申请OpenWeatherMap API密钥** (最重要)
2. **设置环境变量**
3. **运行测试脚本**
4. **验证真实数据**

**现在就开始申请API密钥，让系统使用真实数据！** 🚀
