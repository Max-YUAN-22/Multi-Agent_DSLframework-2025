import React from 'react';
import './AgentSelector.css';

const AgentSelector = ({ 
  agents, 
  selectedAgents, 
  isMultiAgentMode, 
  onToggleAgentSelection,
  onModeChange 
}) => {
  const toggleAgentSelection = (agent) => {
    if (isMultiAgentMode) {
      // 多智能体模式：可以多选
      const isSelected = selectedAgents.some(a => a.id === agent.id);
      if (isSelected) {
        onToggleAgentSelection(selectedAgents.filter(a => a.id !== agent.id));
      } else {
        onToggleAgentSelection([...selectedAgents, agent]);
      }
    } else {
      // 单智能体模式：只能选择一个
      onToggleAgentSelection([agent]);
    }
  };

  return (
    <div className="agent-selector">
      <div className="selector-header">
        <h3 className="selector-title">
          {isMultiAgentMode ? '选择协作智能体' : '选择执行智能体'}
        </h3>
        
        {/* 模式切换 */}
        <div className="mode-switcher">
          <button 
            className={`mode-btn ${!isMultiAgentMode ? 'active' : ''}`}
            onClick={() => onModeChange(false)}
          >
            <span className="mode-icon">🤖</span>
            <span className="mode-label">单智能体</span>
          </button>
          <button 
            className={`mode-btn ${isMultiAgentMode ? 'active' : ''}`}
            onClick={() => onModeChange(true)}
          >
            <span className="mode-icon">👥</span>
            <span className="mode-label">多智能体</span>
          </button>
        </div>
      </div>

      <div className="agent-grid">
        {agents.map(agent => (
          <div 
            key={agent.id}
            className={`agent-card ${selectedAgents.some(a => a.id === agent.id) ? 'selected' : ''}`}
            onClick={() => toggleAgentSelection(agent)}
          >
            <div className={`agent-icon ${agent.color}-icon`}>
              {agent.icon && React.createElement(agent.icon)}
            </div>
            <div className="agent-info">
              <h4 className="agent-name">{agent.name}</h4>
              <p className="agent-role">{agent.role}</p>
            </div>
            <div className="selection-indicator">
              {selectedAgents.some(a => a.id === agent.id) ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      <div className="selection-summary">
        <div className="summary-text">
          已选择 {selectedAgents.length} 个智能体
        </div>
        {selectedAgents.length > 0 && (
          <div className="selected-list">
            {selectedAgents.map(agent => (
              <span key={agent.id} className="selected-tag">
                {agent.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentSelector;
