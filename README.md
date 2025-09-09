# Multi-Agent DSL Framework: A Novel Approach to Real-Time Event Processing

## Abstract

This project presents a novel framework that leverages Domain-Specific Language (DSL) orchestration to coordinate multiple intelligent agents for complex, real-time event processing. The system demonstrates significant innovations in multi-agent coordination, runtime optimization, and real-time feedback mechanisms through two comprehensive use cases: Smart City management and Autonomous Driving coordination.

## Core Innovations

### 1. Extended DSL Primitives
We introduce advanced primitives including `spawn`, `route`, `gather`, `with_sla`, `contract`, `blackboard`, `on`, and `emit` to explicitly model:
- Task decomposition and routing
- Constraint management and SLA enforcement
- Inter-agent collaboration and communication

### 2. Runtime Optimizations
- **RadixTrie Prefix Caching**: Reduces redundant computations by reusing common prefixes across different tasks
- **Cache-Aware Scheduling**: Prioritizes tasks with longer prefixes to improve throughput and response time
- **Structured Output Generation**: Supports Regex and lightweight cFSM validation for format compliance

### 3. Event-Driven Architecture
- **Built-in EventBus**: Enables asynchronous communication and coordination among agents
- **Real-time Feedback Loop**: Complete "sense-decide-act-feedback" cycle through WebSocket integration
- **Full-Stack Reproducibility**: Integrated examples, experiments, unit tests, and CLI tools

## System Architecture

### Technology Stack
- **Backend**: FastAPI + Python 3.8+ with WebSocket support
- **Frontend**: React 18 + Material-UI with real-time visualization
- **Communication**: Socket.IO for bidirectional real-time communication
- **DSL Engine**: Custom Python-based interpreter with advanced primitives

### Key Components

1. **DSL Engine** (`dsl/dsl.py`): Core workflow definition and execution
2. **Multi-Agent System** (`agents/`): Specialized agents for different domains
3. **Event Bus** (`runtime/eventbus.py`): Inter-agent communication hub
4. **Runtime Scheduler** (`runtime/scheduler.py`): Task scheduling and optimization
5. **Web Interface**: Real-time monitoring and interaction dashboard

## Use Cases

### Smart City Management
- **Traffic Optimization**: Dynamic traffic signal adjustment and vehicle rerouting
- **Public Safety**: Emergency service coordination (police, fire, ambulance)
- **Resource Management**: Optimized allocation of sanitation and transportation services

### Autonomous Driving Coordination
- **Fleet Management**: Coordinated movement optimization for delivery routes
- **Collision Avoidance**: Vehicle-to-vehicle communication and collaboration
- **Ride-Sharing Services**: Dynamic passenger-vehicle matching

## Performance Results

The system demonstrates excellent performance across key metrics:

- **Latency**: Sub-second response times for complex event processing
- **Throughput**: Sustained high event processing rates
- **Cache Efficiency**: High hit rates reducing computational overhead
- **Scalability**: Modular architecture supporting horizontal scaling

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- DeepSeek API Key (configure via `scripts/configure.sh`)

### Installation
```bash
# Clone repository
git clone <repository-url>
cd multi-agent-dsl-final

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Running the System
```bash
# Start backend (Terminal 1)
uvicorn backend.main:app --reload --port 8008

# Start frontend (Terminal 2)
cd frontend && npm start
```

### Access Points
- **Frontend Interface**: http://localhost:3000
- **Backend API**: http://localhost:8008
- **WebSocket**: ws://localhost:8008/socket.io

## DSL Examples

### Traffic Incident Response
```python
# Define workflow for traffic incident handling
workflow = dsl.workflow("traffic_incident_response")
incident_detection = dsl.gen("detect_incident", 
                           prompt="Analyze traffic data for incidents", 
                           agent="TrafficIncidentAgent").schedule()
safety_assessment = dsl.gen("assess_safety", 
                           prompt="Evaluate safety implications", 
                           agent="SafetyAgent").schedule()
reroute_planning = dsl.gen("plan_reroute", 
                          prompt="Calculate alternative routes", 
                          agent="RerouteAgent").schedule()

# Coordinate agent responses
results = dsl.join([incident_detection, safety_assessment, reroute_planning], mode="all")
```

### Weather Alert Processing
```python
# Weather alert workflow
weather_workflow = dsl.workflow("weather_alert")
alert_analysis = dsl.gen("analyze_alert", 
                        prompt="Process weather alert data", 
                        agent="WeatherAgent").schedule()
impact_assessment = dsl.gen("assess_impact", 
                           prompt="Evaluate potential impacts", 
                           agent="ImpactAgent").schedule()
response_coordination = dsl.gen("coordinate_response", 
                               prompt="Coordinate emergency response", 
                               agent="EmergencyAgent").schedule()
```

## Research Contributions

1. **Novel DSL Design**: First comprehensive DSL for multi-agent coordination with advanced primitives
2. **Runtime Optimization**: RadixTrie-based caching system for improved performance
3. **Real-time Architecture**: Complete feedback loop implementation for dynamic systems
4. **Practical Applications**: Demonstrated effectiveness in critical real-world scenarios

## Future Work

- Extension to additional domains (healthcare, finance, logistics)
- Advanced machine learning integration for predictive coordination
- Formal verification of DSL workflows
- Performance optimization for larger-scale deployments

## Contact

For questions, collaborations, or technical discussions, please contact the development team.

---

*This framework represents a significant advancement in multi-agent system design and has potential applications across numerous domains requiring real-time, intelligent coordination.*