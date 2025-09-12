// frontend/src/components/InteractionHistory.jsx
import React, { useState } from 'react';
import './InteractionHistory.css';
import WebSocketService from './WebSocketService';
import AgentInteractionFlow from './AgentInteractionFlow';

const InteractionHistory = ({ 
  events = [], 
  onClear, 
  onGenerateReport, 
  onOpenReportSidebar, 
  showReportsOnly, 
  onToggleReportsOnly, 
  readyState, 
  connectionStats,
  connectionError,
  isRetrying,
  onRetryConnection
}) => {
  const [selectedSentEvent, setSelectedSentEvent] = useState(null);
  const [expandedEvents, setExpandedEvents] = useState(new Set());

  const getStatusPill = () => {
    if (isRetrying) {
      return <span className="pill pill-status-connecting">🔄 重连中 / Retrying...</span>;
    }
    
    if (connectionError) {
      return (
        <div className="connection-error-container">
          <span className="pill pill-status-closed">❌ 连接错误 / Connection Error</span>
          <button 
            className="retry-button" 
            onClick={onRetryConnection}
            disabled={isRetrying}
          >
            🔄 重试 / Retry
          </button>
        </div>
      );
    }
    
    switch (readyState) {
      case 0: // CONNECTING
        return <span className="pill pill-status-connecting">🔄 连接中 / Connecting...</span>;
      case 1: // OPEN
        return <span className="pill pill-status-open">✅ 已连接 / Connected</span>;
      case 2: // CLOSING
        return <span className="pill pill-status-closing">⏳ 断开中 / Disconnecting...</span>;
      case 3: // CLOSED
        return (
          <div className="connection-error-container">
            <span className="pill pill-status-closed">❌ 服务不可用 / Service Unavailable</span>
            <button 
              className="retry-button" 
              onClick={onRetryConnection}
              disabled={isRetrying}
            >
              🔄 重试 / Retry
            </button>
          </div>
        );
      default:
        return (
          <div className="connection-error-container">
            <span className="pill pill-status-closed">❌ 服务不可用 / Service Unavailable</span>
            <button 
              className="retry-button" 
              onClick={onRetryConnection}
              disabled={isRetrying}
            >
              🔄 重试 / Retry
            </button>
          </div>
        );
    }
  };

  const handleReconnect = () => {
    WebSocketService.reconnect();
  };

  // 获取事件摘要
  const getEventSummary = (event) => {
    switch (event.type) {
      case 'main_task_result':
        return `${event.payload.agent}: ${event.payload.result.substring(0, 50)}...`;
      case 'coordination_result':
        return `协同完成: ${event.payload.total_agents}个智能体响应`;
      case 'workflow_complete':
        return '工作流完成';
      case 'agent_response':
        return `${event.payload.agent}: ${event.payload.result.substring(0, 50)}...`;
      case 'agent_message':
        return event.payload.substring(0, 50) + '...';
      case 'analysis_report':
        return '分析报告已生成';
      case 'simulation_log':
        return event.payload.details ? event.payload.details.substring(0, 50) + '...' : '模拟日志';
      default:
        return event.title || event.type;
    }
  };

  const getEventIcon = (type) => {
    const icons = {
      'workflow_start': '🚀',
      'main_task_result': '👑', // Master Agent 使用皇冠图标
      'coordination_start': '🤝',
      'coordination_result': '🎯',
      'workflow_complete': '🏁',
      'agent_message': '🤖',
      'agent_response': '💬',
      'analysis_report': '📊',
      'traffic_incident': '🚗',
      'weather_alert': '🌧️',
      'parking_update': '🅿️',
      'safety_inspection': '🛡️',
      'autonomous_driving': '🚙',
      'traffic_monitor': '🚦',
      'simulation_log': '📝',
      'error': '❌',
      'ping': '📡',
      'broadcast': '📡',
      'main_coordination': '👑',
      'sub_agent_coordination': '🤝',
      'sub_agent_processing': '⚙️',
      'sub_agent_completed': '✅',
      'result_summary': '📋',
      'default': '📝'
    };
    return icons[type] || icons['default'];
  };

  const getEventTypeLabel = (type) => {
    const labels = {
      'workflow_start': '工作流启动 / Workflow Start',
      'main_task_result': '主智能体协调 / Master Agent Coordination',
      'coordination_start': '子智能体协调 / Sub Agent Coordination',
      'coordination_result': '子智能体协同 / Sub Agent Collaboration',
      'workflow_complete': '工作流完成 / Workflow Complete',
      'agent_message': '智能体消息 / Agent Message',
      'agent_response': '智能体响应 / Agent Response',
      'analysis_report': '分析报告 / Analysis Report',
      'traffic_incident': '交通事件 / Traffic Incident',
      'weather_alert': '天气警报 / Weather Alert',
      'parking_update': '停车更新 / Parking Update',
      'safety_inspection': '安全检查 / Safety Inspection',
      'autonomous_driving': '自动驾驶 / Autonomous Driving',
      'traffic_monitor': '交通监控 / Traffic Monitor',
      'simulation_log': '模拟日志 / Simulation Log',
      'error': '错误 / Error',
      'ping': '心跳 / Ping',
      'broadcast': '广播消息 / Broadcast',
      'main_coordination': '主智能体协调 / Main Coordination',
      'sub_agent_coordination': '子智能体协调 / Sub Agent Coordination',
      'sub_agent_processing': '子智能体处理 / Sub Agent Processing',
      'sub_agent_completed': '子智能体完成 / Sub Agent Completed',
      'result_summary': '结果汇总 / Result Summary',
      'default': '未知事件 / Unknown Event'
    };
    return labels[type] || labels['default'];
  };

  const renderEvent = (event, index) => {
    if (!event) {
      return <p>No event data</p>;
    }

    const { type, payload, title, timestamp } = event;
    const time = timestamp ? new Date(timestamp).toLocaleTimeString() : 'No timestamp';
    const icon = getEventIcon(type);
    const typeLabel = getEventTypeLabel(type);

    const eventCard = (
      <div className={`event-card event-${type}`} key={`${type}-${timestamp || index}-${index}`}>
        <div className="event-header">
          <div className="event-icon">{icon}</div>
          <div className="event-info">
            <h4 className="event-title">{title || typeLabel}</h4>
            <span className="event-time">{time}</span>
          </div>
          <div className="event-actions">
            <button 
              className="action-btn view-btn" 
              onClick={() => viewEventDetails(event)}
              title="查看详情 / View Details"
            >
              👁️
            </button>
            {type === 'agent_response' && (
              <button 
                className="action-btn replay-btn" 
                onClick={() => replayEvent(event)}
                title="重放事件 / Replay Event"
              >
                🔄
              </button>
            )}
            {type === 'error' && (
              <button 
                className="action-btn retry-btn" 
                onClick={() => retryEvent(event)}
                title="重试 / Retry"
              >
                ⚡
              </button>
            )}
          </div>
        </div>
        <div className="event-content">
          {renderEventContent(type, payload)}
        </div>
      </div>
    );

    return eventCard;
  };

  const renderEventContent = (type, payload) => {
    switch (type) {
      case 'workflow_start':
        return (
          <div className="event-payload">
            <p className="payload-text">{payload}</p>
          </div>
        );
      case 'main_task_result':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>{payload.agent}:</strong> {payload.result}</p>
          </div>
        );
      case 'coordination_start':
        return (
          <div className="event-payload">
            <p className="payload-text">{payload}</p>
          </div>
        );
      case 'coordination_result':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>协同完成:</strong> {payload.total_agents}个智能体响应</p>
            <div className="responses-summary">
              {payload.responses.map((response, index) => (
                <div key={index} className="response-summary">
                  <span className="response-agent">{response.agent}:</span>
                  <span className="response-text">{response.result.substring(0, 100)}...</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'workflow_complete':
        return (
          <div className="event-payload">
            <p className="payload-text">{payload}</p>
          </div>
        );
      case 'agent_message':
        return (
          <div className="event-payload">
            <p className="payload-text">{payload}</p>
          </div>
        );
      case 'agent_response':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>{payload.agent}:</strong> {payload.result}</p>
          </div>
        );
      case 'analysis_report':
        return (
          <div className="event-payload">
            <div className="report-content">
              <h4 className="report-title">📊 城市分析报告 / City Analysis Report</h4>
              <div className="report-body">
                {payload && payload.report ? (
                  <div className="report-text">
                    {payload.report.split('\n').map((line, index) => (
                      <p key={index} className="report-paragraph">{line}</p>
                    ))}
                  </div>
                ) : (
                  <p className="report-text">报告内容加载中... / Report content loading...</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'traffic_incident':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>位置:</strong> {payload.location} - {payload.description}</p>
          </div>
        );
      case 'weather_alert':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>区域:</strong> {payload.area} - <strong>类型:</strong> {payload.alert_type} - <strong>严重程度:</strong> {payload.severity}</p>
          </div>
        );
      case 'parking_update':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>位置:</strong> {payload.location} - <strong>可用车位:</strong> {payload.available_spots}</p>
          </div>
        );
      case 'safety_inspection':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>位置:</strong> {payload.location} - <strong>安全状态:</strong> {payload.safety_status} - <strong>需要人工干预:</strong> {payload.require_human_intervention ? '是' : '否'}</p>
          </div>
        );
      case 'autonomous_driving':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>起点:</strong> {payload.start_location} - <strong>终点:</strong> {payload.end_location} - <strong>乘客数:</strong> {payload.passengers}</p>
          </div>
        );
      case 'traffic_monitor':
        return (
          <div className="event-payload">
            <p className="payload-text"><strong>交通监控数据:</strong> {JSON.stringify(payload)}</p>
          </div>
        );
      case 'simulation_log':
        return (
          <div className="event-payload">
            <p className="payload-text">{payload.details || payload}</p>
          </div>
        );
      case 'error':
        return (
          <div className="event-payload">
            <p className="payload-error">{payload}</p>
          </div>
        );
      case 'ping':
        return null; // Don't display ping messages
      default:
        return (
          <div className="event-payload">
            <p className="payload-text">{JSON.stringify(payload)}</p>
          </div>
        );
    }
  };

  const viewEventDetails = (event) => {
    alert(`事件详情 / Event Details\n\n类型 / Type: ${getEventTypeLabel(event.type)}\n时间 / Time: ${event.timestamp}\n\n详细信息将在模态框中显示 / Detailed information will be shown in a modal.`);
  };

  const replayEvent = (event) => {
    if (confirm(`确定要重放此事件吗？ / Are you sure you want to replay this event?`)) {
      // 这里可以添加重放逻辑
      alert('事件已重放 / Event replayed successfully!');
    }
  };

  const retryEvent = (event) => {
    if (confirm(`确定要重试此事件吗？ / Are you sure you want to retry this event?`)) {
      // 这里可以添加重试逻辑
      alert('事件已重试 / Event retried successfully!');
    }
  };

  const getEventStats = () => {
    const total = filteredEvents.length;
    const byType = filteredEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {});
    return { total, byType };
  };

  // 获取发送的事件（用户主动发送的事件）
  const getSentEvents = () => {
    const sentEventTypes = [
      'weather_alert', 
      'parking_update', 
      'safety_inspection', 
      'autonomous_driving', 
      'traffic_monitor',
      'broadcast',
      'main_coordination',
      'sub_agent_coordination',
      'sub_agent_processing',
      'sub_agent_completed',
      'result_summary',
      'coordination_result',
      'analysis_report'
    ];
    return events.filter(event => sentEventTypes.includes(event.type));
  };

  // 获取发送事件数量
  const getSentEventsCount = () => {
    return getSentEvents().length;
  };

  // 获取发送事件摘要
  const getSentEventSummary = (event) => {
    if (!event) {
      return '未知事件';
    }
    
    // 如果有title，优先使用title
    if (event.title) {
      return event.title;
    }
    
    // 如果有payload，根据类型生成摘要
    if (event.payload) {
      switch (event.type) {
        case 'weather_alert':
          return `区域: ${event.payload.area || '未知'} - 类型: ${event.payload.alert_type || '未知'}`;
        case 'parking_update':
          return `位置: ${event.payload.location || '未知'} - 可用车位: ${event.payload.available_spots || '未知'}`;
        case 'safety_inspection':
          return `位置: ${event.payload.location || '未知'} - 状态: ${event.payload.safety_status || '未知'}`;
        case 'autonomous_driving':
          return `起点: ${event.payload.start_location || '未知'} - 终点: ${event.payload.end_location || '未知'}`;
        case 'traffic_monitor':
          return `交通监控数据`;
        case 'broadcast':
          return event.payload.payload || event.payload.message || '广播消息';
        case 'main_coordination':
          return event.payload.result || '主智能体协调任务';
        case 'sub_agent_coordination':
          return event.payload || '子智能体协调开始';
        case 'sub_agent_processing':
          return event.payload.agent || '子智能体处理中';
        case 'sub_agent_completed':
          return event.payload.result || '子智能体处理完成';
        case 'result_summary':
          return `总计: ${event.payload.total_agents || 0} 个智能体, 成功: ${event.payload.successful_agents || 0} 个`;
        case 'coordination_result':
          return event.payload.summary || '智能体协同完成';
        case 'analysis_report':
          return event.payload.report ? event.payload.report.substring(0, 100) + '...' : '分析报告';
        default:
          return event.type || '未知事件';
      }
    }
    
    return event.type || '未知事件';
  };

  // 获取与发送事件相关的响应事件
  const getRelatedEvents = (sentEvent) => {
    if (!sentEvent || !sentEvent.timestamp) {
      return [];
    }
    
    const sentTime = new Date(sentEvent.timestamp);
    const timeWindow = 10 * 60 * 1000; // 增加到10分钟时间窗口
    
    // 定义智能体响应事件类型
    const responseEventTypes = [
      'workflow_start',
      'main_task_result', 
      'coordination_start',
      'coordination_result',
      'workflow_complete',
      'agent_message',
      'agent_response',
      'analysis_report',
      'simulation_log'
    ];
    
    return events.filter(event => {
      if (!event || !event.timestamp) return false;
      
      const eventTime = new Date(event.timestamp);
      const timeDiff = Math.abs(eventTime.getTime() - sentTime.getTime());
      
      // 在时间窗口内，是响应事件类型，且不是发送事件本身
      return timeDiff <= timeWindow && 
             responseEventTypes.includes(event.type) && 
             event.type !== sentEvent.type;
    }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  // 过滤事件 - 如果只显示报告，则只显示报告类型的事件
  const getFilteredEvents = () => {
    if (showReportsOnly) {
      return events.filter(event => event.type === 'analysis_report');
    }
    return events;
  };

  const filteredEvents = getFilteredEvents();
  const stats = getEventStats();

  return (
    <div className="interaction-record card">
      <div className="history-header">
        <h2 className="card__title">📊 交互历史 / Interaction History</h2>
        <div className="header-controls">
          {getStatusPill()}
          {connectionStats && (
            <span className="pill pill-info">
              📡 {connectionStats.userId ? connectionStats.userId.substring(0, 8) + '...' : 'Unknown'}
            </span>
          )}
        </div>
        {connectionError && (
          <div className="connection-error-message">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{connectionError}</span>
          </div>
        )}
      </div>
      
      {/* 连接状态信息 */}
      <div className="connection-info">
        <div className="connection-details">
          <span className="connection-item">
            <strong>消息数 / Messages:</strong> {events.length}
          </span>
          <span className="connection-item">
            <strong>后端 / Backend:</strong> http://localhost:8008
          </span>
          {connectionStats && (
            <>
              <span className="connection-item">
                <strong>用户ID / User ID:</strong> {connectionStats.userId}
              </span>
              <span className="connection-item">
                <strong>活跃连接 / Active Connections:</strong> {connectionStats.activeConnections}/{connectionStats.totalConnections}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="history-controls">
        <div className="action-buttons">
          <button onClick={onOpenReportSidebar} className="report-sidebar-btn">
            📊 交互报告 / Interaction Report
          </button>
          <button onClick={onGenerateReport} className="generate-btn">
            📄 生成报告 / Generate Report
          </button>
          <button onClick={onClear} className="clear-btn">
            🗑️ 清空历史 / Clear History
          </button>
          <button 
            onClick={onToggleReportsOnly} 
            className={`view-reports-btn ${showReportsOnly ? 'active' : ''}`}
          >
            {showReportsOnly ? '📋 显示全部 / Show All' : '📊 查看报告 / View Reports'}
          </button>
        </div>
      </div>

      <div className="history-layout">
        {/* 左侧：发送的事件详情 */}
        <div className="sent-events-sidebar">
          <div className="sidebar-header">
            <h3>{showReportsOnly ? '📊 报告信息 / Report Info' : '📤 发送的事件 / Sent Events'}</h3>
            <span className="event-count">
              {showReportsOnly ? `${filteredEvents.length} 个报告` : `${getSentEventsCount()} 个事件`}
            </span>
          </div>
          <div className="sent-events-list">
            {showReportsOnly ? (
              // 报告模式：显示报告相关信息
              filteredEvents.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📄</div>
                  <p className="empty-text">暂无生成的报告 / No reports generated yet</p>
                  <p className="empty-subtext">点击"生成报告"按钮创建报告 / Click "Generate Report" to create reports</p>
                </div>
              ) : (
                filteredEvents.map((report, index) => (
                  <div key={index} className="report-summary-item">
                    <div className="event-header">
                      <span className="event-icon">📊</span>
                      <div className="event-info">
                        <div className="event-title">{report.title || '城市分析报告'}</div>
                        <div className="event-meta">
                          <span className="event-time">{report.timestamp ? new Date(report.timestamp).toLocaleTimeString() : '未知时间'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event-summary">
                      {report.payload && report.payload.report ? 
                        `报告摘要: ${report.payload.report.substring(0, 100)}...` : 
                        '报告内容加载中...'
                      }
                    </div>
                  </div>
                ))
              )
            ) : (
              // 正常模式：显示发送事件
              getSentEvents().length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p className="empty-text">暂无发送事件 / No sent events yet</p>
                  <p className="empty-subtext">发送任务以查看事件详情 / Send tasks to view event details</p>
                </div>
              ) : (
                getSentEvents().map((event, index) => (
                  <div 
                    key={index} 
                    className={`sent-event-item ${selectedSentEvent === index ? 'selected' : ''}`}
                    onClick={() => setSelectedSentEvent(index)}
                  >
                    <div className="event-header">
                      <span className="event-icon">{getEventIcon(event.type)}</span>
                      <div className="event-info">
                        <div className="event-title">{getEventTypeLabel(event.type)}</div>
                        <div className="event-meta">
                          <span className="event-time">{event.timestamp ? new Date(event.timestamp).toLocaleTimeString() : '未知时间'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event-summary">
                      {getSentEventSummary(event)}
                    </div>
                  </div>
                ))
              )
            )}
          </div>
        </div>

        {/* 右侧：交互记录和智能体响应 */}
        <div className="interactions-detail">
          {selectedSentEvent !== null ? (
            <div className="detail-view">
              <div className="detail-header">
                <h3>🤖 智能体交互记录 / Agent Interaction Records</h3>
                <button 
                  className="close-detail"
                  onClick={() => setSelectedSentEvent(null)}
                >
                  ✕
                </button>
              </div>
              <div className="detail-content">
                {(() => {
                  const sentEvent = getSentEvents()[selectedSentEvent];
                  if (!sentEvent) return null;
                  
                  // 获取与这个发送事件相关的所有响应事件
                  const relatedEvents = getRelatedEvents(sentEvent);
                  
                  return (
                    <div className="interaction-flow">
                      {/* 显示发送的事件详情 */}
                      <div className="sent-event-detail">
                        <div className="detail-section-header">
                          <span className="section-icon">📤</span>
                          <span className="section-title">发送的事件详情 / Sent Event Details</span>
                        </div>
                        <div className="event-detail-content">
                          <div className="detail-item">
                            <strong>事件类型 / Event Type:</strong> {getEventTypeLabel(sentEvent.type)}
                          </div>
                          <div className="detail-item">
                            <strong>发送时间 / Sent Time:</strong> {new Date(sentEvent.timestamp).toLocaleString()}
                          </div>
                          <div className="detail-item">
                            <strong>事件详情 / Event Details:</strong>
                            <div className="event-payload-detail">
                              {renderEventContent(sentEvent.type, sentEvent.payload)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 显示智能体交互可视化 */}
                      <div className="agent-visualization">
                        <div className="detail-section-header">
                          <span className="section-icon">🎯</span>
                          <span className="section-title">智能体交互可视化 / Agent Interaction Visualization</span>
                        </div>
                        <div className="visualization-container">
                          <AgentInteractionFlow 
                            events={events} 
                            selectedEvent={sentEvent}
                          />
                        </div>
                      </div>

                      {/* 显示智能体响应流程 */}
                      <div className="agent-responses">
                        <div className="detail-section-header">
                          <span className="section-icon">🤖</span>
                          <span className="section-title">智能体响应流程 / Agent Response Flow</span>
                        </div>
                        <div className="response-timeline">
                          {relatedEvents.length === 0 ? (
                            <div className="no-responses">
                              <div className="no-responses-icon">⏳</div>
                              <p>等待智能体响应 / Waiting for agent responses...</p>
                            </div>
                          ) : (
                            relatedEvents.map((event, index) => (
                              <div key={index} className="response-item">
                                <div className="response-header">
                                  <span className="response-icon">{getEventIcon(event.type)}</span>
                                  <span className="response-type">{getEventTypeLabel(event.type)}</span>
                                  <span className="response-time">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                  <button 
                                    className={`expand-btn ${expandedEvents.has(`response_${selectedSentEvent}_${index}`) ? 'expanded' : ''}`}
                                    onClick={() => {
                                      const eventKey = `response_${selectedSentEvent}_${index}`;
                                      const newExpanded = new Set(expandedEvents);
                                      if (newExpanded.has(eventKey)) {
                                        newExpanded.delete(eventKey);
                                      } else {
                                        newExpanded.add(eventKey);
                                      }
                                      setExpandedEvents(newExpanded);
                                    }}
                                  >
                                    {expandedEvents.has(`response_${selectedSentEvent}_${index}`) ? '▼' : '▶'}
                                  </button>
                                </div>
                                
                                {/* 响应摘要 */}
                                <div className="response-summary">
                                  {getEventSummary(event)}
                                </div>
                                
                                {/* 展开的详细响应 */}
                                {expandedEvents.has(`response_${selectedSentEvent}_${index}`) && (
                                  <div className="response-details">
                                    {renderEventContent(event.type, event.payload)}
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="detail-placeholder">
              <div className="placeholder-icon">👆</div>
              <p className="placeholder-text">选择左侧事件查看智能体交互记录</p>
              <p className="placeholder-subtext">Click on a sent event to view agent interaction records</p>
            </div>
          )}
        </div>
      </div>

      <div className="history-footer">
        <div className="footer-stats">
          <span className="stat-item">
            <span className="stat-label">总事件 / Total Events:</span>
            <span className="stat-value">{stats.total}</span>
          </span>
          <span className="stat-item">
            <span className="stat-label">显示 / Showing:</span>
            <span className="stat-value">{filteredEvents.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractionHistory;