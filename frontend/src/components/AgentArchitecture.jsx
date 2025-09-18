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

  // 12个智能体定义
  const agents = [
    { id: 'autonomous-driving', name: '自动驾驶智能体', description: '负责自动驾驶车辆的路径规划和决策', color: '#4CAF50', icon: '🚗' },
    { id: 'traffic-manager', name: '交通管理智能体', description: '管理城市交通流量和信号控制', color: '#FF9800', icon: '🚦' },
    { id: 'weather-monitor', name: '天气监控智能体', description: '监控天气变化并发出预警', color: '#2196F3', icon: '🌤️' },
    { id: 'parking-manager', name: '停车管理智能体', description: '管理停车位分配和停车费用', color: '#9C27B0', icon: '🅿️' },
    { id: 'safety-monitor', name: '安全监控智能体', description: '监控城市安全状况和异常事件', color: '#F44336', icon: '🛡️' },
    { id: 'ems-agent', name: '紧急医疗服务智能体', description: '协调紧急医疗救援服务', color: '#E91E63', icon: '🚑' },
    { id: 'enforcement-agent', name: '执法智能体', description: '执行交通法规和城市管理', color: '#795548', icon: '👮' },
    { id: 'sanitation-agent', name: '环卫智能体', description: '管理城市清洁和垃圾处理', color: '#607D8B', icon: '🧹' },
    { id: 'sprinkler-agent', name: '洒水智能体', description: '控制城市洒水系统', color: '#00BCD4', icon: '💧' },
    { id: 'perception-agent', name: '感知智能体', description: '处理传感器数据和环境感知', color: '#8BC34A', icon: '👁️' },
    { id: 'traffic-incident-agent', name: '交通事件智能体', description: '处理交通事件和事故响应', color: '#FF5722', icon: '⚠️' },
    { id: 'reroute-agent', name: '重路由智能体', description: '优化交通路线和重新规划', color: '#3F51B5', icon: '🔄' }
  ];

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

  const handleSendMessage = () => {
    if (!sendMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      agent: activeSendAgent,
      message: sendMessage,
      timestamp: new Date().toISOString()
    };
    
    setInteractionHistory(prev => [...prev, message]);
    setSendMessage('');
    setActiveSendAgent(null);
  };

  const closeSendInterface = () => {
    setActiveSendAgent(null);
    setSendMessage('');
  };

  return (
    <div className="agent-architecture">
      <div className="header-section">
        <div className="language-switcher">
          <LanguageSwitcher />
        </div>
        <h1 className="main-title">多智能体DSL框架</h1>
        <p className="subtitle">12个智能体协作的完整DSL交互界面</p>
        
        <div className="mode-toggle">
          <button 
            className={`mode-btn ${!isMultiAgentMode ? 'active' : ''}`}
            onClick={() => setIsMultiAgentMode(false)}
          >
            单智能体模式
          </button>
          <button 
            className={`mode-btn ${isMultiAgentMode ? 'active' : ''}`}
            onClick={() => setIsMultiAgentMode(true)}
          >
            多智能体协作模式
          </button>
        </div>
      </div>

      <div className="agents-grid">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`agent-card ${selectedAgent?.id === agent.id ? 'selected' : ''} ${selectedAgents.some(a => a.id === agent.id) ? 'multi-selected' : ''}`}
            onClick={() => toggleAgentSelection(agent)}
            style={{ borderColor: agent.color }}
          >
            <div className="agent-icon" style={{ backgroundColor: agent.color }}>
              {agent.icon}
            </div>
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-description">{agent.description}</p>
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
        ))}
      </div>

      {interactionHistory.length > 0 && (
        <div className="interaction-history">
          <h3>交互历史</h3>
          <div className="history-list">
            {interactionHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-agent">{item.agent.name}</div>
                <div className="history-message">{item.message}</div>
                <div className="history-time">{new Date(item.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSendAgent && (
        <div className="send-modal">
          <div className="send-modal-content">
            <div className="send-modal-header">
              <h3>向 {activeSendAgent.name} 发送消息</h3>
              <button className="close-btn" onClick={closeSendInterface}>×</button>
            </div>
            <div className="send-modal-body">
              <textarea
                value={sendMessage}
                onChange={(e) => setSendMessage(e.target.value)}
                placeholder="输入消息内容..."
                rows={4}
              />
            </div>
            <div className="send-modal-actions">
              <button className="send-cancel-btn" onClick={closeSendInterface}>
                取消
              </button>
              <button 
                className="send-confirm-btn" 
                onClick={handleSendMessage}
                disabled={!sendMessage.trim()}
              >
                发送
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentArchitecture;