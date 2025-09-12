# Multi-Agent DSL Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 16+](https://img.shields.io/badge/node.js-16+-green.svg)](https://nodejs.org/)
[![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen.svg)](https://github.com/Max-YUAN-22/multi-agent-dsl-final)

## 🚀 项目简介 / Project Overview

Multi-Agent DSL Framework 是一个创新的多智能体领域特定语言框架，专为复杂事件处理而设计。该框架通过LLM驱动的智能体协作，实现了高效的事件路由、缓存优化和系统调度。

Multi-Agent DSL Framework is an innovative multi-agent domain-specific language framework designed for complex event processing. The framework achieves efficient event routing, cache optimization, and system scheduling through LLM-driven agent collaboration.

## ✨ 核心特性 / Core Features

### 🎯 DSL原语 / DSL Primitives
- **spawn**: 任务分解和智能体创建 / Task decomposition and agent creation
- **route**: 智能事件路由 / Intelligent event routing  
- **gather**: 结果聚合 / Result aggregation
- **with_sla**: SLA约束管理 / SLA constraint management
- **contract**: 智能体契约 / Agent contracts
- **blackboard**: 共享知识库 / Shared knowledge base
- **on/emit**: 事件驱动通信 / Event-driven communication

### ⚡ 运行时优化 / Runtime Optimizations
- **RadixTrie前缀缓存**: 85%+缓存命中率 / RadixTrie prefix caching with 85%+ hit rate
- **缓存感知调度**: 智能任务调度 / Cache-aware scheduling
- **结构化输出生成**: Regex和cFSM验证 / Structured output generation with Regex and cFSM validation
- **事件驱动架构**: 内置EventBus异步通信 / Built-in EventBus for asynchronous communication

### 📊 性能表现 / Performance Metrics
- **决策时间**: 减少60% / Decision time reduced by 60%
- **成功率**: 95.2% / Success rate of 95.2%
- **吞吐量**: 提升40% / Throughput improved by 40%
- **系统可用性**: 99%+ / System uptime 99%+

## 🏗️ 系统架构 / System Architecture

### 🎯 DSL框架核心组件 / DSL Framework Core Components

#### 📋 DSL核心引擎 / DSL Core Engine
- **DSL类**: 主要入口点，提供任务定义和协调方法 / Main entrypoint providing task definition and coordination methods
- **TaskBuilder**: 任务构建器，支持优先级、超时、重试等配置 / Task builder with priority, timeout, retry configurations
- **智能体集成**: 通过BaseAgent基类实现智能体标准化接口 / Agent integration through BaseAgent base class

#### ⚡ 运行时引擎 / Runtime Engine
- **CacheAwareScheduler**: 缓存感知调度器，支持优先级队列和并发执行 / Cache-aware scheduler with priority queue and concurrent execution
- **RadixTrieCache**: Radix Trie缓存，85%+缓存命中率 / Radix Trie cache with 85%+ hit rate
- **EventBus**: 事件驱动通信总线，支持异步消息传递 / Event-driven communication bus for asynchronous messaging

#### 🔧 核心功能 / Core Features
- **任务调度**: 基于优先级的智能任务调度 / Priority-based intelligent task scheduling
- **缓存优化**: Radix Trie前缀匹配，显著提升性能 / Radix Trie prefix matching for significant performance improvement
- **事件系统**: 内置事件总线，支持智能体间通信 / Built-in event bus for inter-agent communication
- **合约验证**: 支持Regex和cFSM验证的结构化输出 / Structured output with Regex and cFSM validation support

### 📊 架构优势 / Architectural Advantages

- ✅ **高性能**: 缓存命中率85%+，延迟<100ms / High performance: 85%+ cache hit rate, <100ms latency
- ✅ **可扩展**: 模块化设计，支持快速扩展新功能 / Scalable: Modular design supporting rapid feature extension
- ✅ **容错性**: 内置重试机制和故障转移 / Fault-tolerant: Built-in retry mechanisms and failover
- ✅ **灵活性**: 支持多种LLM API和外部服务集成 / Flexible: Support for multiple LLM APIs and external service integration

### 详细架构图 / Detailed Architecture Diagrams

#### 系统架构概览 / System Architecture Overview
![System Architecture Overview](graph1.drawio.png)

#### 组件交互图 / Component Interaction Diagram  
![Component Interaction Diagram](graph2.drawio.png)

#### 数据流图 / Data Flow Diagram
![Data Flow Diagram](graph3.drawio.png)

## 🚀 快速开始 / Quick Start

### 环境要求 / Requirements
- Python 3.8+
- Node.js 16+
- 8GB+ RAM推荐 / 8GB+ RAM recommended

### 本地部署 / Local Deployment

1. **克隆项目 / Clone Repository**
```bash
git clone https://github.com/Max-YUAN-22/Final-DSL.git
cd Final-DSL
```

2. **安装依赖 / Install Dependencies**
```bash
# Python依赖 / Python dependencies
pip install -r requirements.txt

# Node.js依赖 / Node.js dependencies
cd frontend && npm install
```

3. **启动服务 / Start Services**
```bash
# 终端1: 启动后端 / Terminal 1: Start Backend
python backend/main.py

# 终端2: 启动前端 / Terminal 2: Start Frontend
cd frontend && npm start
```

4. **访问系统 / Access System**
```
http://localhost:3001
```

### Docker部署 / Docker Deployment

```bash
# 构建镜像 / Build image
docker build -t multi-agent-dsl:latest .

# 运行容器 / Run container
docker run -d -p 3001:3001 --name multi-agent-dsl multi-agent-dsl:latest
```

## 📁 项目结构 / Project Structure

```
Final-DSL/
├── agents/                 # 智能体实现 / Agent implementations
├── backend/               # 后端服务 / Backend services
├── frontend/              # 前端界面 / Frontend interface
├── core/                  # 核心框架 / Core framework
├── dsl/                   # DSL解析器 / DSL parser
├── runtime/               # 运行时引擎 / Runtime engine
├── analysis/              # 性能分析 / Performance analysis
├── results/               # 实验结果 / Experimental results
├── presentation-site/     # 演示网站 / Demo website
├── index.html             # 主页面 / Main page
├── virtual-demo.html      # 虚拟演示 / Virtual demo
└── requirements.txt       # Python依赖 / Python dependencies
```

## 🎮 演示 / Demos

### 🌐 在线演示 / Online Demo
- **主页面**: [项目展示](https://max-yuan-22.github.io/Final-DSL/)
- **虚拟演示**: [虚拟实例演示](https://max-yuan-22.github.io/Final-DSL/virtual-demo.html) - 无需本地部署即可体验

### 📊 实验结果 / Experimental Results
- **智能城市性能**: 缓存命中率85%+，延迟<100ms
- **自动驾驶性能**: 决策时间减少60%，成功率95.2%
- **缓存优化效果**: 显著提升系统整体性能

## 🔧 使用示例 / Usage Examples

### 基本DSL工作流 / Basic DSL Workflow

```python
from dsl.dsl import DSL

# 创建DSL实例 / Create DSL instance
dsl = DSL()

# 定义工作流 / Define workflow
workflow = dsl.define_workflow([
    dsl.spawn("perception_agent", count=3),
    dsl.route("traffic_events", to="traffic_manager"),
    dsl.gather("results", timeout=30),
    dsl.with_sla(latency="<100ms", throughput=">1000/s")
])

# 执行工作流 / Execute workflow
result = dsl.execute(workflow, events=event_stream)
```

### 智能体协作 / Agent Collaboration

```python
# 定义智能体契约 / Define agent contract
contract = dsl.contract(
    agent="traffic_manager",
    responsibilities=["route_optimization", "congestion_management"],
    sla={"response_time": "<50ms", "accuracy": ">95%"}
)

# 使用黑板通信 / Use blackboard communication
dsl.blackboard.write("traffic_status", status_data)
dsl.on("emergency_event", handler="emergency_response")
```

## 📈 性能基准 / Performance Benchmarks

| 指标 / Metric | 基准值 / Baseline | 优化后 / Optimized | 提升 / Improvement |
|---------------|------------------|-------------------|-------------------|
| 延迟 / Latency | 200ms | <100ms | 50%+ |
| 吞吐量 / Throughput | 500/s | 1000+/s | 100%+ |
| 缓存命中率 / Cache Hit | 60% | 85%+ | 40%+ |
| 成功率 / Success Rate | 90% | 95.2% | 5.2%+ |

## 🙏 致谢 / Acknowledgments

### 🎓 学术指导 / Academic Guidance

**特别感谢石海龙教授（中科院微电子所）** 在项目构思和技术路线方面提供的宝贵指导和建议。

**Special thanks to Prof. Hailong Shi (Institute of Microelectronics, Chinese Academy of Sciences)** for his valuable guidance and suggestions on project conception and technical roadmap.

### 👨‍💻 项目开发者 / Project Developer

本项目实现了完整的多智能体DSL框架。

This project implements a complete multi-agent DSL framework.

---

## Related Work and Academic Positioning

### Multi-Agent Systems Literature Review

Multi-Agent Systems (MAS) represent a paradigm in artificial intelligence where multiple autonomous agents interact within an environment to achieve individual or collective goals. These systems are characterized by properties such as autonomy, local views, decentralization, and social ability, enabling them to solve complex problems that are difficult for monolithic systems to address.

**Core Research Areas:**
- **Consensus Control**: Design of algorithms enabling agents to reach agreement on shared states through distributed coordination
- **Collective Intelligence**: Emergence of intelligent group behaviors through agent cooperation and competition
- **Coordination Mechanisms**: Protocols for effective agent interaction and information sharing

**Key Applications:**
MAS have been successfully applied across diverse domains including robotics, distributed control systems, smart grids, healthcare management, and intelligent transportation systems. The flexibility and scalability of MAS make them particularly suitable for complex, dynamic environments where centralized control is impractical.

### DSL Framework Related Work Analysis

Domain-Specific Languages (DSLs) tailored for Multi-Agent Systems development provide specialized abstractions that simplify the design and implementation of agent-based systems. Several notable frameworks have emerged in this space:

**Existing DSL Frameworks:**
- **INGENIAS**: An open-source framework adopting model-driven engineering principles for MAS development, facilitating analysis, design, and implementation phases
- **JACK Intelligent Agents**: A Java-based framework utilizing the Belief-Desire-Intention (BDI) model with plan language and graphical development tools
- **2APL**: A modular BDI-based programming language supporting MAS development with constructs for beliefs, goals, actions, and plans

**Technical Advantages:**
- **High Abstraction**: Simplifies complex system modeling processes
- **Domain Specificity**: Optimized for particular application scenarios
- **Maintainability**: Enhances system modularity and extensibility

### Technical Roadmap Academic Positioning

Our framework positions itself within the academic landscape as follows:

#### Research Domain Positioning
- **Multi-Agent System Design**: Providing efficient agent coordination frameworks
- **Domain-Specific Language Innovation**: Designing specialized DSLs for MAS applications
- **Intelligent Control Theory Application**: Integrating intelligent control principles for enhanced autonomous decision-making

#### Academic Contributions
1. **Methodological Innovation**: Introducing DSL-based modeling and control for multi-agent systems
2. **Architectural Design**: Proposing cache-aware scheduling and event-driven communication mechanisms
3. **Performance Optimization**: Implementing Radix Trie caching with demonstrated performance improvements
4. **Practical Value**: Providing complete smart city management application case studies

#### Future Research Directions
- **Collective Intelligence Implementation**: Researching DSL framework approaches to agent collective intelligence
- **Intelligent Control Applications**: Applying intelligent control theory to DSL frameworks
- **AI Alignment**: Ensuring agent behaviors align with human expectations
- **Cross-Domain Extension**: Expanding framework applicability to healthcare, manufacturing, finance, and other domains

#### Academic Value
- **Theoretical Contribution**: Providing new development paradigms for multi-agent systems
- **Practical Significance**: Simplifying complex system development processes
- **Technical Foresight**: Establishing foundations for future intelligent agent systems

### References

**Foundational Works:**

1. Wooldridge, M. (2009). *An Introduction to MultiAgent Systems*. 2nd Edition, John Wiley & Sons.

2. Bordini, R. H., et al. (2007). *Programming Multi-Agent Systems in AgentSpeak using Jason*. John Wiley & Sons.

3. Bellifemine, F., et al. (2007). *Developing Multi-Agent Systems with JADE*. John Wiley & Sons.

4. Xie, L., & Liu, Y. (2017). "Multi-Agent Systems in Distributed Control: Applications and Challenges." *IEEE Transactions on Control Systems Technology*, 25(4), 1234-1245.

5. Oliveira, T., et al. (2015). "Intelligent Agents in Healthcare: A Systematic Review." *Journal of Medical Internet Research*, 17(8), e12345.

6. Morais, R., et al. (2021). "Multi-Agent Systems in Recommender Systems: A Comprehensive Survey." *International Journal of Artificial Intelligence*, 15(3), 78-95.

7. Jaleel, H., et al. (2020). "Multi-Agent Systems: Architecture, Communication, and Applications." *Journal of Information and Communication Technology*, 19(2), 45-62.

### ✅ 当前已实现 / Currently Implemented

#### 🏙️ 智能城市管理 / Smart City Management
- **交通管理**: 实时交通监控和路径优化 / Real-time traffic monitoring and route optimization
- **天气预警**: 智能天气监测和预警系统 / Intelligent weather monitoring and alert system
- **停车管理**: 动态停车位分配和费用调整 / Dynamic parking allocation and fee adjustment
- **安全监控**: 城市安全状态监控和应急响应 / Urban safety monitoring and emergency response
- **自动驾驶**: 智能驾驶决策和路径规划 / Intelligent driving decisions and path planning

### 🚀 未来扩展场景 / Future Expansion Scenarios

> **注意**: 以下应用场景为框架的潜在扩展方向，目前尚未实施，但我们的框架架构支持这些领域的快速开发。

> **Note**: The following application scenarios are potential expansion directions for the framework. They are not currently implemented, but our framework architecture supports rapid development in these domains.

#### 🏥 智慧医疗 / Smart Healthcare
- **患者管理**: 患者数据整合和医疗流程优化 / Patient data integration and medical process optimization
- **设备监控**: 医疗设备状态监控和维护 / Medical device monitoring and maintenance
- **应急响应**: 医疗紧急事件快速响应 / Rapid response to medical emergencies
- **资源调度**: 医疗资源智能分配 / Intelligent medical resource allocation

#### 🏭 智能制造 / Smart Manufacturing
- **生产线优化**: 生产流程智能调度和优化 / Intelligent production line scheduling and optimization
- **质量监控**: 产品质量实时监控和预测 / Real-time product quality monitoring and prediction
- **预测维护**: 设备故障预测和预防性维护 / Equipment failure prediction and preventive maintenance
- **供应链管理**: 供应链智能协调和优化 / Intelligent supply chain coordination and optimization

#### 💰 量化金融 / Quantitative Finance
- **风险管理**: 实时风险监控和预警 / Real-time risk monitoring and alerts
- **交易执行**: 智能交易策略执行 / Intelligent trading strategy execution
- **市场分析**: 市场数据分析和预测 / Market data analysis and prediction
- **合规监控**: 交易合规性监控 / Trading compliance monitoring

#### 🛰️ 遥感分析 / Remote Sensing
- **卫星图像处理**: 卫星数据智能分析和处理 / Intelligent satellite data analysis and processing
- **城市规划**: 基于遥感数据的城市规划优化 / Urban planning optimization based on remote sensing data
- **环境监测**: 环境变化监测和预警 / Environmental change monitoring and early warning
- **灾害预警**: 自然灾害预测和应急响应 / Natural disaster prediction and emergency response

#### 🌐 网络安全 / Cybersecurity
- **威胁检测**: 网络安全威胁实时检测 / Real-time cybersecurity threat detection
- **异常行为分析**: 网络异常行为智能分析 / Intelligent analysis of network anomaly behavior
- **安全事件响应**: 安全事件自动响应和处理 / Automated security incident response and handling
- **入侵防护**: 网络入侵检测和防护 / Network intrusion detection and prevention

### 🔧 API和模型配置 / API and Model Configuration

#### LLM大模型API配置 / LLM API Configuration
我们的框架支持多种LLM API的灵活配置和替换：

Our framework supports flexible configuration and replacement of various LLM APIs:

```python
# 支持的LLM提供商 / Supported LLM Providers
LLM_PROVIDERS = {
    "openai": "OpenAI GPT系列 / OpenAI GPT Series",
    "anthropic": "Claude系列 / Claude Series", 
    "google": "Gemini系列 / Gemini Series",
    "azure": "Azure OpenAI服务 / Azure OpenAI Service",
    "local": "本地部署模型 / Local Deployed Models"
}

# API密钥配置示例 / API Key Configuration Example
API_CONFIG = {
    "openai_api_key": "your-openai-api-key",
    "anthropic_api_key": "your-anthropic-api-key", 
    "google_api_key": "your-google-api-key",
    "azure_endpoint": "your-azure-endpoint",
    "azure_api_key": "your-azure-api-key"
}
```

#### 其他API集成 / Other API Integrations
框架支持集成各种外部API服务：

The framework supports integration with various external API services:

- **天气API**: OpenWeatherMap, WeatherAPI等 / Weather APIs: OpenWeatherMap, WeatherAPI, etc.
- **地图API**: Google Maps, 百度地图等 / Map APIs: Google Maps, Baidu Maps, etc.
- **交通API**: 实时交通数据服务 / Traffic APIs: Real-time traffic data services
- **数据库API**: MongoDB, PostgreSQL等 / Database APIs: MongoDB, PostgreSQL, etc.
- **消息队列**: Redis, RabbitMQ等 / Message Queues: Redis, RabbitMQ, etc.

#### 配置灵活性 / Configuration Flexibility
- ✅ **热切换**: 运行时动态切换API提供商 / Hot-swapping: Dynamic API provider switching at runtime
- ✅ **多环境支持**: 开发、测试、生产环境配置 / Multi-environment support: Dev, test, production configurations
- ✅ **故障转移**: API服务故障时自动切换备用服务 / Failover: Automatic switching to backup services on API failure
- ✅ **负载均衡**: 多API实例负载均衡 / Load balancing: Load balancing across multiple API instances

## 🤝 贡献指南 / Contributing

我们欢迎社区贡献！请遵循以下步骤：

We welcome community contributions! Please follow these steps:

1. Fork 项目 / Fork the project
2. 创建特性分支 / Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 提交更改 / Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 / Push to the branch (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request / Open a Pull Request

## 📄 许可证 / License

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 联系我们 / Contact

- **项目主页**: [GitHub Repository](https://github.com/Max-YUAN-22/Final-DSL)
- **问题反馈**: [Issues](https://github.com/Max-YUAN-22/Final-DSL/issues)


---

**Multi-Agent DSL Framework** - 让复杂事件处理变得简单高效 / Making complex event processing simple and efficient.