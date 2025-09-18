# Multi-Agent DSL Framework

A high-performance Domain-Specific Language (DSL) framework for multi-agent coordination with real-world performance evaluation.

## 🚀 Key Features

- **High Performance**: 1.66 tasks/sec throughput (1.89x improvement over AutoGen)
- **Memory Efficient**: 20.90 MB memory consumption (4.1x improvement over AutoGen)
- **Perfect Reliability**: 100% success rate across all test scenarios
- **Low Latency**: 860.77 ms average latency (1.4x reduction vs AutoGen)
- **Three Core Algorithms**: ATSLP, HCMPL, and CALK
- **Real-World Validation**: Comprehensive evaluation with actual API calls
- **Scalability**: Successfully tested with up to 1000 agents

## 📊 Performance Results

| Framework   | Throughput (tasks/sec) | Memory (MB) | Avg Latency (ms) | Success Rate |
| ----------- | ---------------------- | ----------- | ---------------- | ------------ |
| LangChain   | 0.78                   | 37.62       | 1366.97          | 100%         |
| CrewAI      | 0.86                   | 47.27       | 1212.98          | 100%         |
| AutoGen     | 0.88                   | 85.95       | 1208.82          | 100%         |
| **Our DSL** | **1.66**               | **20.90**   | **860.77**       | **100%**     |

## 🏗️ Architecture

Our framework consists of four main layers:

### DSL Layer
High-level primitives for agent coordination:
- `spawn`: Creates new agent instances
- `route`: Routes tasks to appropriate agents
- `gather`: Collects results from multiple agents
- `with_sla`: Enforces service level agreements
- `contract`: Defines formal contracts between agents
- `blackboard`: Provides shared knowledge storage
- `on`/`emit`: Enables event-driven communication

### Runtime Layer
- **Scheduler**: Implements ATSLP algorithm for adaptive task scheduling
- **Cache Manager**: Implements HCMPL algorithm for intelligent caching
- **Metrics Collector**: Monitors system performance and agent behavior

### Algorithm Layer
Three core algorithms:
- **ATSLP**: Adaptive Task Scheduling with Load Prediction
- **HCMPL**: Hierarchical Cache Management with Pattern Learning
- **CALK**: Collaborative Agent Learning with Knowledge Transfer

### Execution Layer
- **Task Builder**: Constructs executable tasks from DSL programs
- **Agent Manager**: Manages agent lifecycle and capabilities
- **LLM Integration**: Provides language model capabilities

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Max-YUAN-22/Multi-Agent_DSLframework.git
cd Multi-Agent_DSLframework
```

2. Install dependencies:
```bash
pip install -r config/requirements.txt
```

### Basic Usage

```python
from dsl.dsl import DSL
from core.robust_llm import llm_callable

# Initialize the framework
dsl = DSL(seed=42, workers=4)

# Define agents
traffic_manager = dsl.spawn("traffic_manager", capabilities=["traffic_analysis", "route_optimization"])
traffic_monitor = dsl.spawn("traffic_monitor", capabilities=["real_time_monitoring", "incident_detection"])

# Create a contract
dsl.contract("traffic_management", 
            parties=["traffic_manager", "traffic_monitor"],
            sla={"response_time": "500ms", "availability": "99.9%"})

# Execute tasks
task = dsl.route("traffic_analysis_task", to="traffic_manager", 
                with_sla={"max_latency": "300ms", "retry_count": 3})

# Run the framework
dsl.run(llm_callable)

# Gather results
results = dsl.gather(from_agents=["traffic_manager", "traffic_monitor"])
```

## 🧪 Testing & Evaluation

### Run Performance Benchmark
```bash
cd scripts
python real_performance_test.py
```

### Reproduce Results
```bash
cd analysis
python quick_validate.py
```

### Verify Academic Integrity
```bash
cd scripts
python verify_academic_results.py
```

## 🌐 Web Demo Platform

Experience the framework through our interactive web demonstration:

**🚀 Live Demo**: https://max-yuan-22.github.io/Final-DSL/

Features:
- Interactive DSL editor with syntax highlighting
- Real-time agent monitoring dashboard
- System architecture visualization
- Performance comparison charts
- Usage examples and tutorials

## 📁 Project Structure

```
Multi-Agent_DSLframework/
├── agents/                     # 20+智能体实现
│   ├── real_api_agents.py      # 真实API智能体
│   ├── traffic_manager_agent.py # 交通管理智能体
│   ├── healthcare_agent.py     # 医疗协调智能体
│   └── ...                     # 其他智能体
├── core/                       # 核心算法实现
│   ├── novel_algorithms.py     # 三个核心算法
│   ├── base_agent.py           # 基础智能体类
│   ├── robust_llm.py           # 鲁棒LLM处理
│   └── theoretical_innovations.py # 理论创新
├── dsl/                        # DSL实现
│   ├── dsl.py                  # 主要DSL实现
│   └── fast_dsl.py             # 优化DSL实现
├── experiments/                # 实验脚本
│   ├── city_realtime.py        # 城市实时实验
│   ├── smart_city.py           # 智慧城市实验
│   └── autonomous_driving.py   # 自动驾驶实验
├── figures/                    # 论文图表
│   ├── performance_*.png       # 性能图表
│   ├── scalability_*.png       # 可扩展性图表
│   └── diagrams/               # 架构图表
├── formal_verification/        # 形式化验证
│   ├── atslp_coq.v            # ATSLP Coq验证
│   ├── calk_coq.v             # CALK Coq验证
│   └── hcmpl_isabelle.thy     # HCMPL Isabelle验证
├── papers/                     # 论文文件
│   ├── CCF_A_CLASS_PAPER_THEORETICAL_ENHANCED.tex # 主要论文
│   └── references.bib          # 参考文献
├── results/                    # 实验结果
│   ├── honest_api_benchmark_results.json # 真实API测试结果
│   ├── real_api_benchmark_results.json    # 真实API基准测试
│   └── statistical_analysis_results.json # 统计分析结果
├── scripts/                    # 工具脚本
│   ├── real_performance_test.py # 真实性能测试
│   ├── verify_academic_results.py # 学术结果验证
│   └── ...                     # 其他工具脚本
├── frontend/                   # Web界面
│   ├── src/                    # React前端源码
│   └── build/                  # 构建文件
├── backend/                    # 后端服务
│   ├── main.py                 # FastAPI后端
│   ├── api_routes.py           # API路由
│   └── websocket_manager.py   # WebSocket管理
├── config/                     # 配置文件
│   ├── requirements.txt        # Python依赖
│   ├── package.json            # Node.js依赖
│   └── docker-compose.yml      # Docker配置
└── data/                       # 数据文件
    ├── events.csv              # 事件数据
    ├── traffic_incident_event.csv # 交通事件数据
    └── statistical_analysis_results.json # 统计分析结果
```

## 🔬 Formal Verification

Our framework includes formal verification using theorem provers:

- **Coq Verification**: `formal_verification/atslp_coq.v`, `formal_verification/calk_coq.v`
- **Isabelle Verification**: `formal_verification/hcmpl_isabelle.thy`

## 📈 Applications

### Traffic Management
Real-time traffic coordination across multiple intersections with intelligent route optimization.

### Healthcare Coordination
Patient care coordination and resource allocation optimization with collaborative learning.

### Smart City Management
Infrastructure monitoring, resource management, and service coordination for large-scale deployments.

## 📚 Research Paper

This implementation accompanies our research paper:

**"A Novel Multi-Agent Domain-Specific Language Framework with Adaptive Scheduling and Collaborative Learning"**

- **Paper**: `papers/CCF_A_CLASS_PAPER_THEORETICAL_ENHANCED.tex`
- **Format**: IEEE Conference format
- **Status**: Ready for submission

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines and code of conduct.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

- **GitHub**: [Max-YUAN-22](https://github.com/Max-YUAN-22)
- **Web Demo**: https://max-yuan-22.github.io/Final-DSL/
- **Repository**: https://github.com/Max-YUAN-22/Multi-Agent_DSLframework

## 🙏 Acknowledgments

We thank Professor Shihailong Shi from the Institute of Microelectronics, Chinese Academy of Sciences, for his valuable guidance and support throughout this research.

---

**Version**: 1.0  
**Last Updated**: 2025  
**License**: MIT
