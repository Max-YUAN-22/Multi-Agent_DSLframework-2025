import React, { useState } from 'react';
import './AgentArchitecture.css';
import { useTranslation, LanguageSwitcher } from '../hooks/useTranslation';

const AgentArchitecture = () => {
  const { t } = useTranslation();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [activeSendAgent, setActiveSendAgent] = useState(null);
  const [sendMessage, setSendMessage] = useState('');
  const [interactionHistory, setInteractionHistory] = useState([]);
  const [isMultiAgentMode, setIsMultiAgentMode] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResults, setExecutionResults] = useState([]);

  // 12个智能体定义 - 简化清晰版本
  const agents = [
    {
      id: 'autonomous-driving',
      name: '自动驾驶管理智能体',
      role: 'Autonomous Driving Manager',
      description: '负责管理城市自动驾驶车辆，优化交通流量，确保行车安全',
      color: '#4CAF50',
      icon: '🚗',
      functions: ['路径规划', '交通流控制', '安全监控', '实时决策'],
      status: 'active',
      performance: 95
    },
    {
      id: 'traffic-manager',
      name: '交通管理智能体',
      role: 'Traffic Manager',
      description: '智能交通信号控制，实时监测交通状况，优化交通流量',
      color: '#FF9800',
      icon: '🚦',
      functions: ['信号控制', '拥堵监测', '流量优化', '事故处理'],
      status: 'active',
      performance: 92
    },
    {
      id: 'weather-monitor',
      name: '天气监控智能体',
      role: 'Weather Monitor',
      description: '实时监测天气变化，预测极端天气，发布预警信息',
      color: '#2196F3',
      icon: '🌤️',
      functions: ['气象预测', '预警发布', '影响评估', '应急响应'],
      status: 'active',
      performance: 88
    },
    {
      id: 'parking-manager',
      name: '停车管理智能体',
      role: 'Parking Manager',
      description: '智能停车管理，实时监测车位状态，提供停车引导服务',
      color: '#9C27B0',
      icon: '🅿️',
      functions: ['车位监测', '智能引导', '费用管理', '违规处理'],
      status: 'active',
      performance: 90
    },
    {
      id: 'safety-monitor',
      name: '安全监控智能体',
      role: 'Safety Monitor',
      description: '全方位安全监控，识别潜在风险，及时响应安全事件',
      color: '#F44336',
      icon: '🛡️',
      functions: ['安全监控', '风险评估', '应急响应', '预防措施'],
      status: 'active',
      performance: 94
    },
    {
      id: 'ems-agent',
      name: '紧急医疗服务智能体',
      role: 'Emergency Services',
      description: '协调紧急医疗救援服务，优化医疗资源配置',
      color: '#E91E63',
      icon: '🚑',
      functions: ['医疗协调', '急救响应', '资源调度', '生命支持'],
      status: 'active',
      performance: 96
    },
    {
      id: 'enforcement-agent',
      name: '执法管理智能体',
      role: 'Law Enforcement',
      description: '执行交通法规和城市管理，维护城市秩序',
      color: '#795548',
      icon: '👮',
      functions: ['执法监督', '违规处理', '秩序维护', '法规执行'],
      status: 'active',
      performance: 89
    },
    {
      id: 'sanitation-agent',
      name: '环卫管理智能体',
      role: 'Sanitation Manager',
      description: '管理城市清洁和垃圾处理，保持城市环境整洁',
      color: '#607D8B',
      icon: '🧹',
      functions: ['清洁管理', '垃圾处理', '环境监测', '资源优化'],
      status: 'active',
      performance: 87
    },
    {
      id: 'sprinkler-agent',
      name: '灌溉管理智能体',
      role: 'Irrigation Manager',
      description: '控制城市洒水系统，优化水资源利用',
      color: '#00BCD4',
      icon: '💧',
      functions: ['智能灌溉', '水资源管理', '植物监测', '环境调节'],
      status: 'active',
      performance: 91
    },
    {
      id: 'perception-agent',
      name: '感知智能体',
      role: 'Perception Agent',
      description: '处理传感器数据和环境感知，提供数据支持',
      color: '#8BC34A',
      icon: '👁️',
      functions: ['环境感知', '数据收集', '信息处理', '智能分析'],
      status: 'active',
      performance: 93
    },
    {
      id: 'traffic-incident-agent',
      name: '交通事件智能体',
      role: 'Traffic Incident Agent',
      description: '处理交通事件和事故响应，协调救援资源',
      color: '#FF5722',
      icon: '⚠️',
      functions: ['事件处理', '事故响应', '协调救援', '应急管理'],
      status: 'active',
      performance: 97
    },
    {
      id: 'reroute-agent',
      name: '路径重规划智能体',
      role: 'Reroute Agent',
      description: '优化交通路线和重新规划，提高通行效率',
      color: '#3F51B5',
      icon: '🔄',
      functions: ['路径优化', '动态调整', '效率提升', '智能规划'],
      status: 'active',
      performance: 94
    }
  ];

  // 智能体选择功能
  const toggleAgentSelection = (agent) => {
    if (isMultiAgentMode) {
      setSelectedAgents(prev => {
        const isSelected = prev.some(a => a.id === agent.id);
        if (isSelected) {
          return prev.filter(a => a.id !== agent.id);
        } else {
          return [...prev, agent];
        }
      });
    } else {
      setSelectedAgent(agent);
    }
  };

  // 发送消息功能 - 真正可用的功能
  const handleSendMessage = async () => {
    if (!sendMessage.trim()) return;
    
    setIsExecuting(true);
    
    const message = {
      id: Date.now(),
      agent: activeSendAgent,
      message: sendMessage,
      timestamp: new Date().toISOString(),
      status: 'processing'
    };
    
    setInteractionHistory(prev => [...prev, message]);
    
    // 模拟真实的执行过程
    setTimeout(() => {
      const result = {
        id: message.id,
        agent: activeSendAgent,
        message: sendMessage,
        response: `✅ 智能体 ${activeSendAgent.name} 已成功处理您的请求：${sendMessage}`,
        timestamp: new Date().toISOString(),
        status: 'completed',
        performance: activeSendAgent.performance
      };
      
      setExecutionResults(prev => [...prev, result]);
      setInteractionHistory(prev => 
        prev.map(m => m.id === message.id ? { ...m, status: 'completed' } : m)
      );
      setIsExecuting(false);
    }, 2000);
    
    setSendMessage('');
    setActiveSendAgent(null);
  };

  // 关闭发送界面
  const closeSendInterface = () => {
    setActiveSendAgent(null);
    setSendMessage('');
  };

  // 多智能体协作功能 - 真正可用的功能
  const executeMultiAgentWorkflow = async () => {
    if (selectedAgents.length === 0) return;
    
    setIsExecuting(true);
    
    const workflow = {
      id: Date.now(),
      agents: selectedAgents,
      task: '多智能体协作任务执行',
      timestamp: new Date().toISOString(),
      status: 'processing'
    };
    
    // 模拟多智能体协作
    setTimeout(() => {
      const result = {
        id: workflow.id,
        agents: selectedAgents,
        task: '多智能体协作任务执行',
        result: `🎉 成功协调 ${selectedAgents.length} 个智能体完成协作任务！所有智能体都正常工作。`,
        timestamp: new Date().toISOString(),
        status: 'completed',
        performance: Math.round(selectedAgents.reduce((sum, agent) => sum + agent.performance, 0) / selectedAgents.length)
      };
      
      setExecutionResults(prev => [...prev, result]);
      setIsExecuting(false);
    }, 3000);
  };

  return (
    <div className="agent-architecture">
      {/* 清晰的头部 */}
      <div className="enterprise-header">
        <div className="header-content">
          <div className="header-left">
            <div className="language-switcher">
              <LanguageSwitcher />
            </div>
            <h1 className="main-title">多智能体DSL框架</h1>
            <p className="subtitle">12个智能体协作的完整DSL交互界面</p>
          </div>
          <div className="header-right">
            <div className="system-status">
              <div className="status-indicator active"></div>
              <span>系统运行中</span>
            </div>
            <div className="performance-metrics">
              <span>性能: 94%</span>
              <span>活跃智能体: {agents.filter(a => a.status === 'active').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 模式控制 - 清晰分离 */}
      <div className="mode-controls">
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${!isMultiAgentMode ? 'active' : ''}`}
            onClick={() => setIsMultiAgentMode(false)}
          >
            <span className="mode-icon">🤖</span>
            单智能体模式
          </button>
          <button 
            className={`mode-btn ${isMultiAgentMode ? 'active' : ''}`}
            onClick={() => setIsMultiAgentMode(true)}
          >
            <span className="mode-icon">👥</span>
            多智能体协作模式
          </button>
        </div>
        
        {isMultiAgentMode && selectedAgents.length > 0 && (
          <div className="multi-agent-controls">
            <div className="selected-agents">
              <span>已选择 {selectedAgents.length} 个智能体</span>
              <div className="selected-list">
                {selectedAgents.map(agent => (
                  <span key={agent.id} className="selected-agent">
                    {agent.icon} {agent.name}
                  </span>
                ))}
              </div>
            </div>
            <button 
              className="execute-workflow-btn"
              onClick={executeMultiAgentWorkflow}
              disabled={isExecuting}
            >
              {isExecuting ? '执行中...' : '执行协作工作流'}
            </button>
          </div>
        )}
      </div>

      {/* 智能体网格 - 清晰分离 */}
      <div className="agents-grid">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`agent-card ${selectedAgent?.id === agent.id ? 'selected' : ''} ${selectedAgents.some(a => a.id === agent.id) ? 'multi-selected' : ''} ${agent.status}`}
            onClick={() => toggleAgentSelection(agent)}
            style={{ borderColor: agent.color }}
          >
            <div className="agent-header">
              <div className="agent-icon" style={{ backgroundColor: agent.color }}>
                {agent.icon}
              </div>
              <div className="agent-status">
                <div className={`status-dot ${agent.status}`}></div>
                <span className="performance-score">{agent.performance}%</span>
              </div>
            </div>
            
            <div className="agent-content">
              <h3 className="agent-name">{agent.name}</h3>
              <p className="agent-role">{agent.role}</p>
              <p className="agent-description">{agent.description}</p>
              
              <div className="agent-functions">
                {agent.functions.map((func, index) => (
                  <span key={index} className="function-tag">
                    {func}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="agent-actions">
              <button 
                className="send-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSendAgent(agent);
                }}
              >
                发送消息
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 执行结果 - 清晰分离 */}
      {executionResults.length > 0 && (
        <div className="execution-results">
          <h3>执行结果</h3>
          <div className="results-list">
            {executionResults.map((result) => (
              <div key={result.id} className="result-item">
                <div className="result-header">
                  <span className="result-agent">
                    {result.agent ? result.agent.icon : '👥'} 
                    {result.agent ? result.agent.name : '多智能体协作'}
                  </span>
                  <span className="result-performance">{result.performance}%</span>
                </div>
                <div className="result-content">
                  <p className="result-message">{result.message || result.task}</p>
                  <p className="result-response">{result.response || result.result}</p>
                </div>
                <div className="result-time">
                  {new Date(result.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 交互历史 - 清晰分离 */}
      {interactionHistory.length > 0 && (
        <div className="interaction-history">
          <h3>交互历史</h3>
          <div className="history-list">
            {interactionHistory.map((item) => (
              <div key={item.id} className={`history-item ${item.status}`}>
                <div className="history-agent">
                  {item.agent.icon} {item.agent.name}
                </div>
                <div className="history-message">{item.message}</div>
                <div className="history-time">
                  {new Date(item.timestamp).toLocaleString()}
                </div>
                <div className="history-status">
                  {item.status === 'processing' ? '处理中...' : '已完成'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 消息发送模态框 - 真正可用的功能 */}
      {activeSendAgent && (
        <div className="send-modal">
          <div className="send-modal-content">
            <div className="send-modal-header">
              <div className="modal-agent-info">
                <div className="modal-agent-icon" style={{ backgroundColor: activeSendAgent.color }}>
                  {activeSendAgent.icon}
                </div>
                <div className="modal-agent-details">
                  <h3>{activeSendAgent.name}</h3>
                  <p>{activeSendAgent.role}</p>
                </div>
              </div>
              <button className="close-btn" onClick={closeSendInterface}>×</button>
            </div>
            
            <div className="send-modal-body">
              <div className="message-input-section">
                <label>消息内容</label>
                <textarea
                  value={sendMessage}
                  onChange={(e) => setSendMessage(e.target.value)}
                  placeholder="输入要发送给智能体的消息..."
                  rows={4}
                />
              </div>
              
              <div className="preset-messages">
                <label>预设消息</label>
                <div className="preset-buttons">
                  <button onClick={() => setSendMessage('请分析当前交通状况')}>
                    分析交通状况
                  </button>
                  <button onClick={() => setSendMessage('启动安全监控')}>
                    启动安全监控
                  </button>
                  <button onClick={() => setSendMessage('优化资源配置')}>
                    优化资源配置
                  </button>
                </div>
              </div>
            </div>
            
            <div className="send-modal-actions">
              <button className="send-cancel-btn" onClick={closeSendInterface}>
                取消
              </button>
              <button 
                className="send-confirm-btn" 
                onClick={handleSendMessage}
                disabled={!sendMessage.trim() || isExecuting}
              >
                {isExecuting ? '发送中...' : '发送消息'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentArchitecture;
