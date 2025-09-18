# Mermaid图表代码集合

## Figure 8. Multi-Agent DSL Framework Architecture

```mermaid
flowchart LR
    subgraph DSL["DSL Layer"]
        A[DSL] --> B[TaskBuilder]
    end
    
    subgraph Runtime["Runtime Layer"]
        C[Scheduler]
        D[Cache]
        E[Metrics]
    end
    
    subgraph Algorithm["Algorithm Layer"]
        F[AW-RR]
        G[PAAC]
        H[CRL]
    end
    
    subgraph Execution["Execution Layer"]
        I[Tasks] --> J[Agents] --> K[LLM]
    end
    
    A --> C
    C --> F
    F --> I
    D --> G
    E --> H
    K --> L[DeepSeek API]
    
    style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style C fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style F fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style I fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style L fill:#fce4ec,stroke:#880e4f,stroke-width:2px
```

## Figure 9. AW-RR Algorithm Flow

```mermaid
flowchart TD
    A[New Task Arrives] --> B[Filter Capable Agents]
    B --> C[Calculate Load Factor]
    C --> D[Get Agent Weights]
    D --> E[Calculate Selection Score]
    E --> F[Select Best Agent]
    F --> G[Execute Task]
    G --> H[Calculate Performance]
    H --> I[Update Weights]
    I --> J[Normalize Weights]
    J --> A
    
    K[Load = Current/Max] -.-> C
    L[Score = Weight×(1-Load)] -.-> E
    M[Performance = Expected/Actual] -.-> H
    N[New Weight = 0.9×Old+0.1×Perf] -.-> I
    
    style A fill:#e3f2fd,stroke:#01579b,stroke-width:2px
    style F fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style I fill:#fff3e0,stroke:#e65100,stroke-width:2px
```

## Figure 10. PAAC Cache Algorithm Architecture

```mermaid
flowchart LR
    A[Access History] --> B[Frequency Analysis]
    B --> C[Correlation Analysis]
    C --> D[Pattern Recognition]
    
    E[Cache Items] --> F[Recency Analysis]
    F --> G[Comprehensive Score<br/>0.4×Freq + 0.3×Corr + 0.3×Recency]
    G --> H[Eviction Decision]
    H --> I[Cache Update]
    
    D --> G
    
    style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style E fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style G fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
```

## Figure 11. CRL Collaborative Learning Mechanism

```mermaid
flowchart LR
    A[Agent A] --> B[Calculate Similarity]
    B --> C[Similarity > 0.7?]
    C -->|Yes| D[Transfer Knowledge]
    C -->|No| E[Skip Transfer]
    D --> F[Update Q-Table]
    E --> F
    F --> G[Performance Feedback]
    G --> A
    
    style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style D fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style F fill:#fff3e0,stroke:#e65100,stroke-width:2px
```

## Figure 12. Task Execution Flow

```mermaid
flowchart TD
    A[DSL Program Start] --> B[Parse Task Definition]
    B --> C[Create TaskBuilder]
    C --> D[Configure Task Parameters]
    D --> E[Check Cache]
    E --> F{Cache Hit?}
    F -->|Yes| G[Return Cached Result]
    F -->|No| H[AW-RR Select Agent]
    H --> I[Assign Task to Agent]
    I --> J[Execute Task]
    J --> K[CRL Learning Update]
    K --> L[PAAC Cache Result]
    L --> M[Collect Performance Metrics]
    M --> N[Task Complete]
    N --> O[Event Notification]
    O --> P[Update System State]
    P --> Q[DSL Program End]
    
    style A fill:#e3f2fd,stroke:#01579b,stroke-width:2px
    style G fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style N fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style Q fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
```

## Figure 13. Performance Optimization Strategy

```mermaid
flowchart TD
    subgraph LoadBalancing["Load Balancing Optimization"]
        A1[AW-RR Algorithm] --> A2[Dynamic Weight Adjustment]
        A2 --> A3[Load-Aware Selection]
        A3 --> A4[Performance History Tracking]
    end
    
    subgraph Caching["Cache Optimization"]
        B1[PAAC Algorithm] --> B2[Pattern Recognition]
        B2 --> B3[Correlation Analysis]
        B3 --> B4[Adaptive Eviction]
    end
    
    subgraph Learning["Learning Optimization"]
        C1[CRL Algorithm] --> C2[Similarity Calculation]
        C2 --> C3[Knowledge Transfer]
        C3 --> C4[Collaborative Learning]
    end
    
    subgraph System["System Optimization"]
        D1[RadixTrie Cache] --> D2[Prefix Matching]
        D2 --> D3[Memory Efficiency]
        D3 --> D4[Fast Retrieval]
    end
    
    A4 --> E[Comprehensive Performance Improvement]
    B4 --> E
    C4 --> E
    D4 --> E
    
    style E fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style A1 fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style B1 fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style C1 fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style D1 fill:#fce4ec,stroke:#880e4f,stroke-width:2px
```

## Figure 14. Experimental Evaluation Framework

```mermaid
flowchart TD
    A[Scalability Testing<br/>1-1000 Agents] --> B[Throughput<br/>Tasks/Second]
    C[Baseline Comparison<br/>LangChain/CrewAI/AutoGen] --> D[Memory Usage<br/>GB]
    E[Cache Performance<br/>Sequential/Random/Repeated] --> F[Cache Hit Rate<br/>Percentage]
    G[Latency Analysis<br/>Simple/Medium/Complex] --> H[Latency<br/>Milliseconds]
    
    B --> I[Performance Results<br/>1.37-2.09x Improvement]
    D --> I
    F --> I
    H --> I
    
    style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style C fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style E fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style G fill:#fff3e0,stroke:#e65100,stroke-width:2px
    style I fill:#fce4ec,stroke:#880e4f,stroke-width:2px
```

## Figure 15. Framework Component Interaction

```mermaid
flowchart LR
    A[DSL API] --> B[TaskBuilder]
    B --> C[Scheduler]
    C --> D[AW-RR Algorithm]
    D --> E[Agent Pool]
    
    F[Cache Manager] --> G[PAAC Algorithm]
    G --> H[RadixTrie Cache]
    
    I[Metrics] --> J[CRL Algorithm]
    J --> K[Q-Tables]
    
    C --> F
    F --> I
    
    style A fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    style D fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    style G fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style J fill:#fff3e0,stroke:#e65100,stroke-width:2px
```

## 使用说明

### Python图表 (已生成)
以下图表已经用Python生成，保存在 `figures/` 目录中：

1. **throughput_comparison.png** - 吞吐量对比图
2. **scalability_analysis.png** - 可扩展性分析图
3. **cache_performance.png** - 缓存性能分析图
4. **latency_analysis.png** - 延迟分析图
5. **algorithm_comparison.png** - 算法性能对比图
6. **memory_usage.png** - 内存使用分析图
7. **performance_summary.png** - 性能总结雷达图

### Mermaid图表 (需要复制代码)
以下图表需要用Mermaid制作，请复制上面的代码到Mermaid编辑器：

1. **系统架构图** - 展示框架整体架构
2. **AW-RR算法流程图** - 展示负载均衡算法流程
3. **PAAC缓存算法架构** - 展示缓存算法架构
4. **CRL协作学习机制** - 展示协作学习机制
5. **任务执行流程图** - 展示任务执行流程
6. **性能优化策略图** - 展示优化策略
7. **实验评估框架图** - 展示实验设计
8. **框架组件交互图** - 展示组件交互

### 图表使用建议

1. **Python图表**: 直接插入论文，分辨率300 DPI，适合性能数据展示
2. **Mermaid图表**: 用于展示算法流程和系统架构，适合概念性说明
3. **组合使用**: Python图表展示数据，Mermaid图表展示流程
4. **学术标准**: 所有图表都有清晰的标题、图例和标注

### 图表质量
- **分辨率**: 300 DPI以上
- **格式**: PNG和PDF两种格式
- **颜色**: 学术友好的配色方案
- **字体**: 清晰易读的字体
- **标注**: 重要数据点标注
- **一致性**: 保持图表风格一致
