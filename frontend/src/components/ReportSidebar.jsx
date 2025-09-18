// frontend/src/components/ReportSidebar.jsx
import React, { useState, useEffect } from 'react';
import './ReportSidebar.css';

const ReportSidebar = ({ events = [], isOpen, onClose, onGenerateReport }) => {
  const [reportData, setReportData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 获取最近5次发送的事件
  const getRecentSentEvents = () => {
    const sentEventTypes = ['weather_alert', 'parking_update', 'safety_inspection', 'autonomous_driving'];
    return events
      .filter(event => sentEventTypes.includes(event.type))
      .slice(-5)
      .reverse(); // 最新的在前
  };

  // 获取与发送事件相关的智能体交互
  const getAgentInteractions = (sentEvent) => {
    if (!sentEvent || !sentEvent.timestamp) return [];
    
    const sentTime = new Date(sentEvent.timestamp);
    const timeWindow = 5 * 60 * 1000; // 5分钟时间窗口
    
    const responseEventTypes = [
      'workflow_start',
      'main_task_result', 
      'coordination_start',
      'coordination_result',
      'workflow_complete',
      'agent_message',
      'agent_response',
      'analysis_report'
    ];
    
    return events.filter(event => {
      if (!event || !event.timestamp) return false;
      
      const eventTime = new Date(event.timestamp);
      const timeDiff = Math.abs(eventTime.getTime() - sentTime.getTime());
      
      return timeDiff <= timeWindow && 
             responseEventTypes.includes(event.type) && 
             event.type !== sentEvent.type;
    }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  // 获取所有报告
  const getAllReports = () => {
    const reports = events.filter(event => event.type === 'analysis_report');
    console.log('📊 Found reports:', reports);
    return reports;
  };

  // 生成报告
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      await onGenerateReport();
      // 等待报告生成完成
      setTimeout(() => {
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating report:', error);
      setIsGenerating(false);
    }
  };

  // 获取事件图标
  const getEventIcon = (type) => {
    const icons = {
      'workflow_start': '🚀',
      'main_task_result': '👑',
      'coordination_start': '🤝',
      'coordination_result': '🎯',
      'workflow_complete': '🏁',
      'agent_message': '🤖',
      'agent_response': '💬',
      'analysis_report': '📊',
      'weather_alert': '🌧️',
      'parking_update': '🅿️',
      'safety_inspection': '🛡️',
      'autonomous_driving': '🚙',
      'default': '📝'
    };
    return icons[type] || icons['default'];
  };

  // 获取事件类型标签
  const getEventTypeLabel = (type) => {
    const labels = {
      'workflow_start': '工作流启动',
      'main_task_result': '主智能体协调',
      'coordination_start': '子智能体协调',
      'coordination_result': '子智能体协同',
      'workflow_complete': '工作流完成',
      'agent_message': '智能体消息',
      'agent_response': '智能体响应',
      'analysis_report': '分析报告',
      'weather_alert': '天气警报',
      'parking_update': '停车更新',
      'safety_inspection': '安全检查',
      'autonomous_driving': '自动驾驶',
      'default': '未知事件'
    };
    return labels[type] || labels['default'];
  };

  // 渲染智能体交互流程
  const renderAgentInteractionFlow = (interactions) => {
    if (interactions.length === 0) {
      return (
        <div className="no-interactions">
          <div className="no-interactions-icon">⏳</div>
          <p>等待智能体响应...</p>
        </div>
      );
    }

    return (
      <div className="interaction-flow">
        {interactions.map((interaction, index) => (
          <div key={index} className="interaction-step">
            <div className="step-header">
              <span className="step-icon">{getEventIcon(interaction.type)}</span>
              <span className="step-type">{getEventTypeLabel(interaction.type)}</span>
              <span className="step-time">
                {new Date(interaction.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="step-content">
              {interaction.type === 'agent_response' && interaction.payload?.agent ? (
                <div className="agent-response">
                  <strong>{interaction.payload.agent}:</strong> {interaction.payload.result}
                </div>
              ) : interaction.type === 'coordination_result' ? (
                <div className="coordination-result">
                  <strong>协同完成:</strong> {interaction.payload?.total_agents || 0}个智能体响应
                </div>
              ) : (
                <div className="step-message">
                  {typeof interaction.payload === 'string' ? interaction.payload : JSON.stringify(interaction.payload)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // 渲染发送事件摘要
  const renderSentEventSummary = (event) => {
    if (!event || !event.payload) return '未知事件';
    
    switch (event.type) {
      case 'weather_alert':
        return `区域: ${event.payload.area || '未知'} - 类型: ${event.payload.alert_type || '未知'}`;
      case 'parking_update':
        return `位置: ${event.payload.location || '未知'} - 可用车位: ${event.payload.available_spots || '未知'}`;
      case 'safety_inspection':
        return `位置: ${event.payload.location || '未知'} - 状态: ${event.payload.safety_status || '未知'}`;
      case 'autonomous_driving':
        return `起点: ${event.payload.start_location || '未知'} - 终点: ${event.payload.end_location || '未知'}`;
      default:
        return event.title || event.type;
    }
  };

  const recentEvents = getRecentSentEvents();

  return (
    <div className={`report-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">📊 智能体交互报告</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="sidebar-content">
        {/* 报告生成按钮 */}
        <div className="report-controls">
          <button 
            className="generate-report-btn"
            onClick={handleGenerateReport}
            disabled={isGenerating || recentEvents.length === 0}
          >
            {isGenerating ? '🔄 生成中...' : '📄 生成综合报告'}
          </button>
          <p className="report-hint">
            基于最近 {recentEvents.length} 次发送事件生成报告
          </p>
        </div>

        {/* 最近发送事件列表 */}
        <div className="recent-events-section">
          <h3 className="section-title">📤 最近发送事件</h3>
          {recentEvents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <p>暂无发送事件</p>
              <p className="empty-subtext">发送任务以查看交互记录</p>
            </div>
          ) : (
            <div className="events-list">
              {recentEvents.map((event, index) => {
                const interactions = getAgentInteractions(event);
                return (
                  <div key={index} className="event-item">
                    <div className="event-header">
                      <span className="event-icon">{getEventIcon(event.type)}</span>
                      <div className="event-info">
                        <div className="event-title">{getEventTypeLabel(event.type)}</div>
                        <div className="event-time">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="event-summary">
                      {renderSentEventSummary(event)}
                    </div>

                    {/* 智能体交互记录 */}
                    <div className="agent-interactions">
                      <div className="interactions-header">
                        <span className="interactions-title">🤖 智能体交互记录</span>
                        <span className="interactions-count">
                          {interactions.length} 个响应
                        </span>
                      </div>
                      {renderAgentInteractionFlow(interactions)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 生成的报告 */}
        <div className="reports-section">
          <h3 className="section-title">📊 生成的报告</h3>
          {getAllReports().length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <p>暂无生成的报告</p>
              <p className="empty-subtext">点击"生成综合报告"按钮创建报告</p>
            </div>
          ) : (
            <div className="reports-list">
              {getAllReports().map((report, index) => (
                <div key={index} className="report-item">
                  <div className="report-header">
                    <span className="report-icon">📊</span>
                    <div className="report-info">
                      <div className="report-title">{report.title || '城市分析报告'}</div>
                      <div className="report-time">
                        {new Date(report.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="report-content">
                    {report.payload && report.payload.report ? (
                      <div className="report-text">
                        {report.payload.report.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="report-paragraph">{line}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="report-text">报告内容加载中...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 统计信息 */}
        <div className="stats-section">
          <h3 className="section-title">📈 统计信息</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{recentEvents.length}</div>
              <div className="stat-label">发送事件</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {recentEvents.reduce((sum, event) => sum + getAgentInteractions(event).length, 0)}
              </div>
              <div className="stat-label">智能体响应</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{getAllReports().length}</div>
              <div className="stat-label">生成报告</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSidebar;
