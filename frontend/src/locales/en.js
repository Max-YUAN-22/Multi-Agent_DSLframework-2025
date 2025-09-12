// English language pack
export const en = {
  // System status
  systemStatus: {
    running: 'System Running',
    collaborating: 'Agent Collaboration',
    ready: 'DSL Engine Ready'
  },

  // Section titles
  sections: {
    agentArchitecture: 'Agent Architecture',
    taskPlanning: 'Task Planning',
    executionReport: 'Execution Report',
    functionControl: 'Function Control',
    interactionMonitoring: 'Interaction Monitoring',
    subtitle: 'Multi-Agent DSL Framework - Agent Collaboration & DSL Execution',
    taskSubtitle: 'Task Input, Agent Selection, Execution Control',
    reportSubtitle: 'Real-time Monitoring, Result Analysis, Performance Reports'
  },

  // Agent names
  agents: {
    master: 'City Manager Master Agent',
    autonomousDriving: 'Autonomous Driving Manager',
    trafficManager: 'Traffic Manager',
    weatherMonitor: 'Weather Monitor',
    parkingManager: 'Parking Manager',
    safetyMonitor: 'Safety Monitor',
    emergencyServices: 'Emergency Services',
    lawEnforcement: 'Law Enforcement',
    sanitationManager: 'Sanitation Manager',
    irrigationManager: 'Irrigation Manager',
    perceptionAgent: 'Perception Agent',
    trafficIncidentAgent: 'Traffic Incident Agent',
    rerouteAgent: 'Reroute Agent',
    trafficMonitorAgent: 'Traffic Monitor Agent'
  },

  // Agent descriptions
  agentDescriptions: {
    autonomousDriving: 'Manages urban autonomous vehicles, optimizes traffic flow, and ensures driving safety.',
    trafficManager: 'Intelligent traffic signal control, real-time traffic monitoring, and traffic flow optimization.',
    weatherMonitor: 'Real-time weather monitoring, extreme weather prediction, and alert information dissemination.',
    parkingManager: 'Intelligent parking management, real-time parking space monitoring, and parking guidance services.',
    safetyMonitor: 'Comprehensive safety monitoring, identifying potential risks, and responding promptly to safety incidents.',
    emergencyServices: 'Emergency medical service management, rapid response to medical emergency needs.',
    lawEnforcement: 'Law enforcement management agent, maintaining urban order and handling violations.',
    sanitationManager: 'Intelligent sanitation management, monitoring waste conditions, and optimizing cleaning operations.',
    irrigationManager: 'Intelligent irrigation management, monitoring soil moisture, and optimizing water resource utilization.',
    perceptionAgent: 'Environmental perception agent, monitoring urban environmental changes and providing data support.',
    trafficIncidentAgent: 'Traffic incident handling agent, rapid response to traffic accidents and coordination of rescue.',
    rerouteAgent: 'Route replanning agent, dynamically adjusting traffic routes and optimizing traffic efficiency.',
    trafficMonitorAgent: 'Traffic monitoring agent, real-time traffic monitoring and providing data support.'
  },

  // Agent detailed descriptions
  agentDetails: {
    autonomousDriving: 'Uses AI algorithms to analyze traffic conditions in real-time, providing optimal path planning for autonomous vehicles, coordinating vehicle interactions, and handling emergency situations.',
    trafficManager: 'Monitors traffic flow in real-time through sensor networks, dynamically adjusts signal timing, reduces congestion, and improves traffic efficiency.',
    weatherMonitor: 'Integrates multi-source meteorological data, provides accurate weather forecasts, issues severe weather warnings promptly, and assists other agents in developing response strategies.',
    parkingManager: 'Monitors parking space usage through IoT sensors, provides real-time parking information and navigation services to drivers, and optimizes parking resource utilization.',
    safetyMonitor: 'Monitors urban safety conditions in real-time through video surveillance and sensor networks, identifies abnormal behavior, and responds quickly to safety incidents.',
    emergencyServices: 'Integrates medical resources, optimizes emergency vehicle dispatch, and provides rapid response and efficient services for emergency medical events.',
    lawEnforcement: 'Identifies violations through intelligent monitoring systems, coordinates law enforcement resources, and maintains urban public order.',
    sanitationManager: 'Monitors trash bin status through sensors, intelligently dispatches cleaning vehicles, optimizes sanitation routes, and maintains clean urban environment.',
    irrigationManager: 'Monitors soil moisture and plant growth conditions, intelligently controls irrigation systems, and optimizes water resource utilization efficiency.',
    perceptionAgent: 'Collects environmental data through various sensors, monitors urban environmental changes in real-time, and provides data support for other agents.',
    trafficIncidentAgent: 'Quickly identifies traffic accidents, coordinates rescue resources, optimizes accident handling processes, and reduces traffic impact.',
    rerouteAgent: 'Provides optimal route planning for vehicles based on real-time traffic data and historical patterns, dynamically adjusts routes to avoid congestion, and improves traffic efficiency.',
    trafficMonitorAgent: 'Monitors traffic conditions in real-time through video surveillance and sensor networks, providing accurate traffic data and analysis reports.'
  },

  // Function control
  functionControl: {
    title: 'Agent Function Display',
    multiAgentTitle: 'Multi-Agent Collaboration',
    singleAgentTitle: 'Single Agent Function',
    selectedAgents: 'Selected Agents:',
    startCollaboration: 'Start Collaboration',
    sendMessage: 'Send Message',
    modeToggle: 'Multi-Agent',
    modeToggleTooltip: 'Switch to Multi-Agent Collaboration Mode'
  },

  // Interaction monitoring
  monitoring: {
    interactionCount: 'Interactions',
    inProgress: 'In Progress',
    completed: 'Completed',
    interactionHistory: 'Interaction History',
    clearHistory: 'Clear History'
  },

  // Agent roles
  roles: {
    master: 'City Management Master Agent',
    autonomousDriving: 'Autonomous Driving Management',
    trafficManager: 'Traffic Flow Management',
    weatherMonitor: 'Weather Monitoring & Analysis',
    parkingManager: 'Parking Resource Management',
    safetyMonitor: 'Safety Risk Monitoring',
    emergencyServices: 'Emergency Response Services',
    lawEnforcement: 'Law Enforcement Management',
    sanitationManager: 'Sanitation Management',
    irrigationManager: 'Smart Irrigation Management',
    perceptionAgent: 'Environmental Perception Analysis',
    trafficIncidentAgent: 'Traffic Incident Handling',
    rerouteAgent: 'Route Replanning',
    trafficMonitorAgent: 'Traffic Monitoring Analysis'
  },

  // Buttons and actions
  buttons: {
    send: 'Send',
    clear: 'Clear',
    start: 'Start',
    cancel: 'Cancel',
    confirm: 'Confirm',
    close: 'Close'
  },

  // Messages and prompts
  messages: {
    selectAgent: 'Please select an agent',
    enterMessage: 'Please enter message content',
    collaborationStarted: 'Multi-agent collaboration started',
    messageSent: 'Message sent',
    historyCleared: 'Interaction history cleared'
  },

  // Task planning
  taskPlanning: {
    inputTitle: 'Task Input',
    placeholder: 'Enter the task to execute, e.g.: Optimize urban traffic flow, ensure driving safety',
    examples: 'Example Tasks',
    example1: 'Optimize urban traffic flow, ensure driving safety',
    example2: 'Handle emergency weather alerts, activate emergency response',
    example3: 'Coordinate parking resources, reduce traffic congestion',
    agentSelection: 'Agent Selection',
    executeTask: 'Execute Task'
  },

  // Execution report
  report: {
    summary: 'Execution Summary',
    details: 'Detailed Report',
    completedTasks: 'Completed Tasks',
    activeAgents: 'Active Agents',
    successRate: 'Success Rate',
    emptyTitle: 'No Execution Records',
    emptyMessage: 'Detailed reports and analysis results will be displayed after task execution'
  },

  // DSL related
  dsl: {
    primitives: 'DSL Primitives',
    execution: 'DSL Execution',
    workflow: 'Workflow',
    phase: 'Phase',
    participants: 'Participants',
    status: 'Status',
    timestamp: 'Timestamp'
  }
};
