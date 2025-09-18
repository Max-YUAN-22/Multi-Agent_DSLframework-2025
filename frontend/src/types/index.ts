// types/agent.ts
export interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ComponentType;
  color: string;
  functions: string[];
  description: string;
  details: string;
  position: {
    angle: number;
    radius: number;
  };
}

export interface AgentPosition {
  angle: number;
  radius: number;
}

// types/workflow.ts
export interface WorkflowStep {
  id: string | number;
  workflowId: number;
  type: 'workflow_step' | 'master_coordination' | 'sub_agent_task' | 'collaboration_message' | 'single_agent_message';
  phase?: string;
  dsl?: {
    primitive: string;
    syntax: string;
    example: string;
    description: string;
  };
  agents: Agent[];
  message: string;
  description?: string;
  timestamp: string;
  status: 'active' | 'completed' | 'processing' | 'pending' | 'failed';
  response?: {
    summary: string;
    details: string[];
    result: string;
    apiCall?: string;
    dsl?: any;
  };
}

// types/connection.ts
export interface ConnectionStats {
  totalConnections: number;
  successfulConnections: number;
  failedConnections: number;
  lastConnectionTime: string | null;
  lastError: string | null;
  connected: boolean;
  userId: string;
  socketId: string | null;
}

export interface ConnectionStatus {
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  message: string;
}

// types/events.ts
export interface EventMessage {
  type: string;
  payload: any;
  title?: string;
  timestamp: string;
}

// types/props.ts
export interface AgentSelectorProps {
  agents: Agent[];
  selectedAgents: Agent[];
  isMultiAgentMode: boolean;
  onToggleAgentSelection: (agents: Agent[]) => void;
  onModeChange: (isMultiAgent: boolean) => void;
}

export interface TaskInputProps {
  sendMessage: string;
  setSendMessage: (message: string) => void;
  onExecuteTask: () => void;
  isMultiAgentMode: boolean;
  selectedAgents: Agent[];
  isLoading: boolean;
}

export interface WorkflowExecutorProps {
  interactionHistory: WorkflowStep[];
  isLoading: boolean;
  error: string | null;
}

export interface InteractionHistoryProps {
  events: EventMessage[];
  readyState: number;
  connectionStats: ConnectionStats | null;
  connectionError: string | null;
  isRetrying: boolean;
  onGenerateReport: () => void;
  onClear: () => void;
  onOpenReportSidebar: () => void;
  onRetryConnection: () => void;
  showReportsOnly: boolean;
  onToggleReportsOnly: (show: boolean) => void;
}

// types/dsl.ts
export interface DSLPrimitive {
  name: string;
  description: string;
  syntax: string;
  example: string;
}

export interface MultiAgentWorkflow {
  receiveTask: (userTask: string) => WorkflowStep;
  analyzeAndPlan: (task: string) => WorkflowStep;
  distributeTasks: (strategy: string, agents: Agent[]) => WorkflowStep;
  agentCollaboration: (agents: Agent[], task: string) => WorkflowStep;
  executeTasks: (agents: Agent[], tasks: string) => WorkflowStep;
  reportIssues: (agent: Agent, issue: string) => WorkflowStep;
  resolveIssues: (issue: string, solution: string) => WorkflowStep;
  redistributeTasks: (newStrategy: string, agents: Agent[]) => WorkflowStep;
  finalExecution: (agents: Agent[], finalTasks: string) => WorkflowStep;
  finalReview: (results: string, agents: Agent[]) => WorkflowStep;
}
