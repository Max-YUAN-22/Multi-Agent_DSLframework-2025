import React from 'react';
import './TaskInput.css';

const TaskInput = ({ 
  sendMessage, 
  setSendMessage, 
  onExecuteTask, 
  isMultiAgentMode,
  selectedAgents,
  isLoading 
}) => {
  const taskTemplates = [
    "🚦 优化城市交通流量，确保行车安全",
    "🌧️ 处理恶劣天气下的应急响应",
    "🅿️ 智能停车位分配和路线规划", 
    "🚨 处理交通事故和紧急救援",
    "🌱 环境监测和清洁路线优化",
    "📊 城市数据分析和决策支持"
  ];

  const handleTemplateClick = (template) => {
    setSendMessage(template);
  };

  const handleExecute = () => {
    if (isMultiAgentMode) {
      if (selectedAgents.length < 2) {
        alert('多智能体模式请至少选择2个智能体！');
        return;
      }
    } else {
      if (selectedAgents.length !== 1) {
        alert('单智能体模式请选择1个智能体！');
        return;
      }
    }
    
    if (!sendMessage.trim()) {
      alert('请输入任务描述！');
      return;
    }

    onExecuteTask();
  };

  const isExecuteDisabled = () => {
    if (isLoading) return true;
    if (!sendMessage.trim()) return true;
    if (isMultiAgentMode) {
      return selectedAgents.length < 2;
    } else {
      return selectedAgents.length !== 1;
    }
  };

  return (
    <div className="task-input">
      <div className="input-header">
        <h3 className="input-title">任务规划 / Task Planning</h3>
        <div className="input-subtitle">输入任务描述或选择预设模板</div>
      </div>

      <div className="input-area">
        <textarea
          className="task-textarea"
          placeholder="请输入要执行的任务描述..."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          rows="4"
          disabled={isLoading}
        />
        
        <div className="template-section">
          <h4 className="template-title">预设任务模板</h4>
          <div className="template-grid">
            {taskTemplates.map((template, index) => (
              <button
                key={index}
                className="template-btn"
                onClick={() => handleTemplateClick(template)}
                disabled={isLoading}
              >
                {template}
              </button>
            ))}
          </div>
        </div>

        <div className="execute-section">
          <button 
            className={`execute-btn ${isExecuteDisabled() ? 'disabled' : ''}`}
            onClick={handleExecute}
            disabled={isExecuteDisabled()}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                处理中...
              </>
            ) : (
              <>
                <span className="execute-icon">🚀</span>
                {isMultiAgentMode ? '启动多智能体协作' : '执行单智能体任务'}
              </>
            )}
          </button>
          
          <div className="execute-info">
            <div className="info-item">
              <span className="info-label">模式：</span>
              <span className="info-value">{isMultiAgentMode ? '多智能体协作' : '单智能体执行'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">已选智能体：</span>
              <span className="info-value">{selectedAgents.length} 个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
