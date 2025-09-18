// 中文语言包
export const zh = {
  // 系统状态
  systemStatus: {
    running: '系统运行中',
    collaborating: '智能体协作',
    ready: 'DSL引擎就绪'
  },

  // 区域标题
  sections: {
    agentArchitecture: '智能体架构',
    taskPlanning: '任务规划',
    executionReport: '执行报告',
    functionControl: '功能控制',
    interactionMonitoring: '交互监控',
    subtitle: 'Multi-Agent DSL Framework - 智能体协作与DSL执行',
    taskSubtitle: '任务输入、智能体选择、执行控制',
    reportSubtitle: '实时监控、结果分析、性能报告'
  },

  // 智能体名称
  agents: {
    master: '城市管理主智能体',
    autonomousDriving: '自动驾驶管理智能体',
    trafficManager: '交通管理智能体',
    weatherMonitor: '天气监测智能体',
    parkingManager: '停车管理智能体',
    safetyMonitor: '安全监测智能体',
    emergencyServices: '紧急服务智能体',
    lawEnforcement: '执法管理智能体',
    sanitationManager: '环卫管理智能体',
    irrigationManager: '灌溉管理智能体',
    perceptionAgent: '感知智能体',
    trafficIncidentAgent: '交通事件智能体',
    rerouteAgent: '路径重规划智能体',
    trafficMonitorAgent: '交通监控智能体'
  },

  // 智能体描述
  agentDescriptions: {
    autonomousDriving: '负责管理城市自动驾驶车辆，优化交通流量，确保行车安全。',
    trafficManager: '智能交通信号控制，实时监测交通状况，优化交通流量。',
    weatherMonitor: '实时监测天气变化，预测极端天气，发布预警信息。',
    parkingManager: '智能停车管理，实时监测车位状态，提供停车引导服务。',
    safetyMonitor: '全方位安全监控，识别潜在风险，及时响应安全事件。',
    emergencyServices: '紧急医疗服务管理，快速响应医疗急救需求。',
    lawEnforcement: '执法管理智能体，维护城市秩序，处理违法行为。',
    sanitationManager: '智能环卫管理，监测垃圾状况，优化清洁作业。',
    irrigationManager: '智能灌溉管理，监测土壤湿度，优化水资源利用。',
    perceptionAgent: '环境感知智能体，监测城市环境变化，提供数据支持。',
    trafficIncidentAgent: '交通事件处理智能体，快速响应交通事故，协调救援。',
    rerouteAgent: '路径重规划智能体，动态调整交通路线，优化通行效率。',
    trafficMonitorAgent: '交通监控智能体，实时监测交通状况，提供数据支持。'
  },

  // 智能体详细描述
  agentDetails: {
    autonomousDriving: '通过AI算法实时分析交通状况，为自动驾驶车辆提供最优路径规划，协调车辆间的交互，处理紧急情况。',
    trafficManager: '通过传感器网络实时监测交通流量，动态调整信号灯时序，减少拥堵，提高通行效率。',
    weatherMonitor: '整合多源气象数据，提供精准的天气预报，及时发布恶劣天气预警，协助其他智能体制定应对策略。',
    parkingManager: '通过物联网传感器监测停车位使用情况，为驾驶员提供实时停车位信息和导航服务，优化停车资源利用。',
    safetyMonitor: '通过视频监控、传感器网络等技术手段，实时监测城市安全状况，识别异常行为，快速响应安全事件。',
    emergencyServices: '整合医疗资源，优化急救车辆调度，为紧急医疗事件提供快速响应和高效服务。',
    lawEnforcement: '通过智能监控系统识别违法行为，协调执法资源，维护城市治安秩序。',
    sanitationManager: '通过传感器监测垃圾桶状态，智能调度清洁车辆，优化环卫作业路线，保持城市环境整洁。',
    irrigationManager: '监测土壤湿度和植物生长状况，智能控制灌溉系统，优化水资源利用效率。',
    perceptionAgent: '通过多种传感器收集环境数据，实时监测城市环境变化，为其他智能体提供数据支持。',
    trafficIncidentAgent: '快速识别交通事故，协调救援资源，优化事故处理流程，减少交通影响。',
    rerouteAgent: '基于实时交通数据和历史模式，为车辆提供最优路径规划，动态调整路线以避开拥堵，提高交通效率。',
    trafficMonitorAgent: '通过视频监控和传感器网络，实时监测交通状况，提供准确的交通数据和分析报告。'
  },

  // 功能控制
  functionControl: {
    title: '智能体功能展示',
    multiAgentTitle: '多智能体协作',
    singleAgentTitle: '单智能体功能',
    selectedAgents: '已选择的智能体：',
    startCollaboration: '启动智能协作',
    sendMessage: '发送消息',
    modeToggle: '多智能体',
    modeToggleTooltip: '切换到多智能体协作模式'
  },

  // 交互监控
  monitoring: {
    interactionCount: '交互次数',
    inProgress: '进行中',
    completed: '已完成',
    interactionHistory: '交互记录',
    clearHistory: '清空记录'
  },

  // 智能体角色
  roles: {
    master: '城市管理主智能体',
    autonomousDriving: '自动驾驶管理',
    trafficManager: '交通流量管理',
    weatherMonitor: '天气监测分析',
    parkingManager: '停车资源管理',
    safetyMonitor: '安全风险监控',
    emergencyServices: '紧急响应服务',
    lawEnforcement: '执法监督管理',
    sanitationManager: '环卫清洁管理',
    irrigationManager: '智能灌溉管理',
    perceptionAgent: '环境感知分析',
    trafficIncidentAgent: '交通事件处理',
    rerouteAgent: '路径重规划',
    trafficMonitorAgent: '交通监控分析'
  },

  // 按钮和操作
  buttons: {
    send: '发送',
    clear: '清空',
    start: '开始',
    cancel: '取消',
    confirm: '确认',
    close: '关闭'
  },

  // 消息和提示
  messages: {
    selectAgent: '请选择智能体',
    enterMessage: '请输入消息内容',
    collaborationStarted: '多智能体协作已启动',
    messageSent: '消息已发送',
    historyCleared: '交互记录已清空'
  },

  // 任务规划
  taskPlanning: {
    inputTitle: '任务输入',
    placeholder: '请输入要执行的任务，例如：优化城市交通流量，确保行车安全',
    examples: '示例任务',
    example1: '优化城市交通流量，确保行车安全',
    example2: '处理紧急天气预警，启动应急响应',
    example3: '协调停车资源，减少交通拥堵',
    agentSelection: '智能体选择',
    executeTask: '执行任务'
  },

  // 执行报告
  report: {
    summary: '执行摘要',
    details: '详细报告',
    completedTasks: '已完成任务',
    activeAgents: '活跃智能体',
    successRate: '成功率',
    emptyTitle: '暂无执行记录',
    emptyMessage: '执行任务后将显示详细的报告和分析结果'
  },

  // DSL相关
  dsl: {
    primitives: 'DSL原语',
    execution: 'DSL执行',
    workflow: '工作流程',
    phase: '阶段',
    participants: '参与者',
    status: '状态',
    timestamp: '时间戳'
  }
};
