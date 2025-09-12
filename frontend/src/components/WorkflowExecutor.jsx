import React from 'react';
import './WorkflowExecutor.css';

const WorkflowExecutor = ({ 
  interactionHistory, 
  isLoading, 
  error 
}) => {
  // DSL原语定义
  const dslPrimitives = {
    EVENT_ROUTE: {
      name: "EVENT_ROUTE",
      description: "事件路由原语 - 智能路由复杂事件到合适的智能体",
      syntax: "EVENT_ROUTE(event_type, priority, target_agents)",
      example: "EVENT_ROUTE('traffic_incident', 'high', ['traffic_manager', 'safety_agent'])"
    },
    CACHE_OPTIMIZE: {
      name: "CACHE_OPTIMIZE", 
      description: "缓存优化原语 - 优化智能体间数据缓存和共享",
      syntax: "CACHE_OPTIMIZE(cache_strategy, ttl, agents)",
      example: "CACHE_OPTIMIZE('distributed', 300, ['perception', 'weather'])"
    },
    SYSTEM_SCHEDULE: {
      name: "SYSTEM_SCHEDULE",
      description: "系统调度原语 - 协调多智能体执行顺序和资源分配", 
      syntax: "SYSTEM_SCHEDULE(task_queue, resource_limit, execution_order)",
      example: "SYSTEM_SCHEDULE(['analyze', 'optimize', 'execute'], 'cpu:80%', 'sequential')"
    },
    AGENT_COLLABORATE: {
      name: "AGENT_COLLABORATE",
      description: "智能体协作原语 - 实现智能体间的实时协作和通信",
      syntax: "AGENT_COLLABORATE(collaboration_type, participants, protocol)",
      example: "AGENT_COLLABORATE('consensus', ['traffic', 'safety'], 'broadcast')"
    },
    LLM_DRIVE: {
      name: "LLM_DRIVE",
      description: "LLM驱动原语 - 利用大语言模型进行智能决策和任务分解",
      syntax: "LLM_DRIVE(prompt_template, context, output_format)",
      example: "LLM_DRIVE('analyze_traffic_pattern', sensor_data, 'json')"
    }
  };

  // 根据阶段获取对应的DSL原语
  const getDSLPrimitiveForPhase = (phase) => {
    const phaseToPrimitive = {
      'LEADER_RECEIVE_TASK': 'EVENT_ROUTE',
      'MEETING_ANALYSIS': 'LLM_DRIVE',
      'TASK_DISTRIBUTION': 'SYSTEM_SCHEDULE',
      'AGENT_COLLABORATION': 'AGENT_COLLABORATE',
      'TASK_EXECUTION': 'EVENT_ROUTE',
      'ISSUE_REPORTING': 'EVENT_ROUTE',
      'ISSUE_RESOLUTION': 'LLM_DRIVE',
      'TASK_REDISTRIBUTION': 'SYSTEM_SCHEDULE',
      'FINAL_EXECUTION': 'AGENT_COLLABORATE',
      'FINAL_REVIEW': 'LLM_DRIVE'
    };
    
    const primitiveName = phaseToPrimitive[phase] || 'EVENT_ROUTE';
    return dslPrimitives[primitiveName];
  };
  const getWorkflowStepIcon = (phase) => {
    const icons = {
      'LEADER_RECEIVE_TASK': '👑',
      'MEETING_ANALYSIS': '🧠',
      'TASK_DISTRIBUTION': '📋',
      'AGENT_COLLABORATION': '💬',
      'TASK_EXECUTION': '⚡',
      'ISSUE_REPORTING': '⚠️',
      'ISSUE_RESOLUTION': '🔧',
      'TASK_REDISTRIBUTION': '🔄',
      'FINAL_EXECUTION': '✅',
      'FINAL_REVIEW': '📊'
    };
    return icons[phase] || '📝';
  };

  const getWorkflowStepTitle = (phase) => {
    const titles = {
      'LEADER_RECEIVE_TASK': 'Master智能体接收任务',
      'MEETING_ANALYSIS': 'Master智能体分析任务',
      'TASK_DISTRIBUTION': 'Master智能体分配任务',
      'AGENT_COLLABORATION': '子智能体协作交流',
      'TASK_EXECUTION': '子智能体执行任务',
      'ISSUE_REPORTING': '智能体汇报问题',
      'ISSUE_RESOLUTION': 'Master智能体制定解决方案',
      'TASK_REDISTRIBUTION': 'Master智能体重新分配任务',
      'FINAL_EXECUTION': '子智能体完成最终任务',
      'FINAL_REVIEW': 'Master智能体总结复盘'
    };
    return titles[phase] || phase;
  };

  const getWorkflowStepDescription = (phase) => {
    const descriptions = {
      'LEADER_RECEIVE_TASK': 'Master智能体亮起，开始接收用户任务',
      'MEETING_ANALYSIS': 'Master智能体使用LLM分析任务，制定协作策略',
      'TASK_DISTRIBUTION': 'Master智能体向子智能体分配具体任务',
      'AGENT_COLLABORATION': '子智能体开始协作交流，共享信息',
      'TASK_EXECUTION': '子智能体开始执行具体任务',
      'ISSUE_REPORTING': '智能体向Master智能体汇报问题',
      'ISSUE_RESOLUTION': 'Master智能体分析问题，制定解决方案',
      'TASK_REDISTRIBUTION': 'Master智能体重新分配任务，调整执行策略',
      'FINAL_EXECUTION': '子智能体协作完成最终任务',
      'FINAL_REVIEW': 'Master智能体广播最终结果，进行复盘总结'
    };
    return descriptions[phase] || '执行工作流步骤';
  };

  const workflowSteps = interactionHistory.filter(item => item.type === 'workflow_step');

  return (
    <div className="workflow-executor">
      <div className="executor-header">
        <h3 className="executor-title">🚀 Multi-Agent DSL 工作流执行</h3>
        <div className="executor-subtitle">实时展示多智能体协作过程</div>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner-large"></div>
            <p className="loading-text">正在处理任务...</p>
            <p className="loading-subtext">Multi-Agent DSL Framework 正在协调智能体执行</p>
          </div>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <div className="error-content">
            <span className="error-icon">⚠️</span>
            <span className="error-message">{error}</span>
          </div>
        </div>
      )}

      <div className="workflow-timeline">
        {workflowSteps.length > 0 ? (
          workflowSteps.map((step, index) => (
            <div key={step.id} className="workflow-step">
              <div className="step-indicator">
                <div className="step-icon">
                  {getWorkflowStepIcon(step.phase)}
                </div>
                <div className="step-number">{index + 1}</div>
              </div>
              
              <div className="step-content">
                <div className="step-header">
                  <h4 className="step-title">{getWorkflowStepTitle(step.phase)}</h4>
                  <span className="step-time">{step.timestamp}</span>
                </div>
                
                <div className="step-description">
                  {getWorkflowStepDescription(step.phase)}
                </div>
                
                {step.dsl && (
                  <div className="dsl-info">
                    <div className="dsl-header">
                      <span className="dsl-icon">🔧</span>
                      <span className="dsl-title">DSL原语: {step.dsl.primitive}</span>
                    </div>
                    <div className="dsl-details">
                      <div className="dsl-syntax">
                        <span className="syntax-label">语法:</span>
                        <code className="syntax-code">{step.dsl.syntax}</code>
                      </div>
                      <div className="dsl-example">
                        <span className="example-label">示例:</span>
                        <code className="example-code">{step.dsl.example}</code>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 如果没有DSL信息，使用默认的DSL原语 */}
                {!step.dsl && step.phase && (
                  <div className="dsl-info">
                    <div className="dsl-header">
                      <span className="dsl-icon">🔧</span>
                      <span className="dsl-title">DSL原语: {getDSLPrimitiveForPhase(step.phase).name}</span>
                    </div>
                    <div className="dsl-details">
                      <div className="dsl-description">
                        <span className="description-label">描述:</span>
                        <span className="description-text">{getDSLPrimitiveForPhase(step.phase).description}</span>
                      </div>
                      <div className="dsl-syntax">
                        <span className="syntax-label">语法:</span>
                        <code className="syntax-code">{getDSLPrimitiveForPhase(step.phase).syntax}</code>
                      </div>
                      <div className="dsl-example">
                        <span className="example-label">示例:</span>
                        <code className="example-code">{getDSLPrimitiveForPhase(step.phase).example}</code>
                      </div>
                    </div>
                  </div>
                )}
                
                {step.agents && step.agents.length > 0 && (
                  <div className="participants">
                    <span className="participants-label">参与者:</span>
                    <div className="participants-list">
                      {step.agents.map((agent, idx) => (
                        <span key={idx} className="participant-tag">
                          {agent.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-workflow">
            <div className="empty-icon">📋</div>
            <h4 className="empty-title">暂无工作流执行记录</h4>
            <p className="empty-message">
              选择智能体并执行任务后，这里将显示详细的Multi-Agent DSL工作流执行过程
            </p>
            
            {/* 显示DSL原语示例 */}
            <div className="dsl-primitives-showcase">
              <h5 className="showcase-title">🔧 DSL原语示例</h5>
              <div className="primitives-grid">
                {Object.values(dslPrimitives).map((primitive, index) => (
                  <div key={index} className="primitive-card">
                    <div className="primitive-header">
                      <span className="primitive-icon">🔧</span>
                      <span className="primitive-name">{primitive.name}</span>
                    </div>
                    <div className="primitive-description">
                      {primitive.description}
                    </div>
                    <div className="primitive-syntax">
                      <span className="syntax-label">语法:</span>
                      <code className="syntax-code">{primitive.syntax}</code>
                    </div>
                    <div className="primitive-example">
                      <span className="example-label">示例:</span>
                      <code className="example-code">{primitive.example}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowExecutor;
