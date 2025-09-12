import React, { useState, useEffect } from 'react';
import './AgentInteractionFlow.css';

const AgentInteractionFlow = ({ events, selectedEvent }) => {
  const [interactionFlow, setInteractionFlow] = useState([]);

  // 智能体配置
  const agentConfig = {
    'master_agent': { name: '主智能体', icon: '🎯', color: '#ff6b6b' },
    'traffic_manager': { name: '交通管理', icon: '🚦', color: '#4ecdc4' },
    'safety_agent': { name: '安全检测', icon: '🛡️', color: '#45b7d1' },
    'weather_agent': { name: '天气预警', icon: '🌦️', color: '#96ceb4' },
    'parking_agent': { name: '停车管理', icon: '🅿️', color: '#feca57' },
    'autonomous_driving': { name: '自动驾驶', icon: '🚗', color: '#ff9ff3' }
  };

  // 解析事件生成交互流程
  useEffect(() => {
    if (!selectedEvent || !events) return;

    const relatedEvents = getRelatedEvents(selectedEvent, events);
    const flow = generateInteractionFlow(selectedEvent, relatedEvents);
    setInteractionFlow(flow);
  }, [selectedEvent, events]);

  const getRelatedEvents = (sentEvent, allEvents) => {
    if (!sentEvent || !sentEvent.timestamp) return [];
    
    const timeWindow = 10 * 60 * 1000; // 10分钟
    const sentTime = new Date(sentEvent.timestamp);
    
    return allEvents.filter(event => {
      if (!event.timestamp || event.id === sentEvent.id) return false;
      
      const eventTime = new Date(event.timestamp);
      const timeDiff = Math.abs(eventTime.getTime() - sentTime.getTime());
      
      return timeDiff <= timeWindow;
    }).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const generateInteractionFlow = (sentEvent, relatedEvents) => {
    const flow = [];
    
    // 1. 初始事件
    const eventType = sentEvent?.type || sentEvent?.event_type || '未知事件';
    const eventTitle = getEventTitle(sentEvent);
    
    flow.push({
      id: 'initial',
      type: 'event',
      agent: getAgentFromEvent(sentEvent),
      message: `触发事件: ${eventTitle}`,
      timestamp: sentEvent?.timestamp,
      status: 'completed'
    });

    // 2. 工作流事件
    relatedEvents.forEach(event => {
      const agent = getAgentFromEvent(event);
      const message = getEventMessage(event);
      
      flow.push({
        id: event.id || `event_${Date.now()}`,
        type: event.type,
        agent: agent,
        message: message,
        timestamp: event.timestamp,
        status: 'completed',
        details: event.payload
      });
    });

    return flow;
  };

  const getEventTitle = (event) => {
    if (!event) return '未知事件';
    
    const eventType = event.type || event.event_type || '';
    const payload = event.payload || {};
    
    switch (eventType) {
      case 'weather_alert':
        return `天气预警 - ${payload.alert_type || '未知类型'}`;
      case 'autonomous_driving':
        return `自动驾驶 - ${payload.start_location || '起点'} → ${payload.end_location || '终点'}`;
      case 'parking_update':
        return `停车更新 - ${payload.location || '未知位置'}`;
      case 'safety_inspection':
        return `安全检查 - ${payload.location || '未知位置'}`;
      default:
        return eventType || '未知事件';
    }
  };

  const getAgentFromEvent = (event) => {
    if (!event) return 'master_agent';
    
    const eventType = event.type || event.event_type || '';
    const payload = event.payload || {};
    
    switch (eventType) {
      case 'weather_alert':
        return 'weather_agent';
      case 'autonomous_driving':
        return 'autonomous_driving';
      case 'parking_update':
        return 'parking_agent';
      case 'safety_inspection':
        return 'safety_agent';
      case 'workflow_start':
      case 'workflow_complete':
        return 'master_agent';
      case 'main_task_result':
        return 'master_agent';
      case 'coordination_start':
      case 'coordination_result':
        return 'master_agent';
      case 'agent_response':
        // 从payload中获取智能体信息
        if (typeof payload === 'object' && payload !== null && payload.agent) {
          const agentName = payload.agent;
          if (typeof agentName === 'string') {
            if (agentName.includes('交通管理')) return 'traffic_manager';
            if (agentName.includes('安全')) return 'safety_agent';
            if (agentName.includes('天气')) return 'weather_agent';
            if (agentName.includes('停车')) return 'parking_agent';
            if (agentName.includes('自动驾驶')) return 'autonomous_driving';
          }
        }
        return 'master_agent';
      case 'agent_error':
        return 'master_agent';
      default:
        // 从payload判断
        if (typeof payload === 'string' && payload.length > 0) {
          if (payload.includes('TrafficManager') || payload.includes('交通管理')) return 'traffic_manager';
          if (payload.includes('SafetyAgent') || payload.includes('安全')) return 'safety_agent';
          if (payload.includes('WeatherAgent') || payload.includes('天气')) return 'weather_agent';
          if (payload.includes('ParkingAgent') || payload.includes('停车')) return 'parking_agent';
          if (payload.includes('AutonomousDriving') || payload.includes('自动驾驶')) return 'autonomous_driving';
        } else if (typeof payload === 'object' && payload !== null) {
          // 如果是对象，尝试从对象属性中获取信息
          const payloadStr = JSON.stringify(payload);
          if (payloadStr.includes('TrafficManager') || payloadStr.includes('交通管理')) return 'traffic_manager';
          if (payloadStr.includes('SafetyAgent') || payloadStr.includes('安全')) return 'safety_agent';
          if (payloadStr.includes('WeatherAgent') || payloadStr.includes('天气')) return 'weather_agent';
          if (payloadStr.includes('ParkingAgent') || payloadStr.includes('停车')) return 'parking_agent';
          if (payloadStr.includes('AutonomousDriving') || payloadStr.includes('自动驾驶')) return 'autonomous_driving';
        }
        
        return 'master_agent';
    }
  };

  const getEventMessage = (event) => {
    const eventType = event.type || '';
    const payload = event.payload || {};
    
    switch (eventType) {
      case 'workflow_start':
        return '工作流启动';
      case 'main_task_result':
        return '主智能体协调完成';
      case 'coordination_start':
        return '子智能体协调开始';
      case 'coordination_result':
        return '子智能体协调完成';
      case 'workflow_complete':
        return '工作流执行完成';
      case 'agent_response':
        // 从payload中获取智能体响应信息
        if (typeof payload === 'object' && payload !== null && payload.agent) {
          return `${payload.agent}响应`;
        }
        return '智能体响应';
      case 'agent_error':
        return '智能体执行错误';
      default:
        if (typeof payload === 'string' && payload.length > 0) {
          if (payload.includes('暴雨') || payload.includes('heavy_rain')) {
            if (payload.includes('TrafficManager')) return '暴雨天气交通紧急响应';
            if (payload.includes('SafetyAgent')) return '暴雨天气安全紧急响应';
          }
        } else if (typeof payload === 'object' && payload !== null) {
          const payloadStr = JSON.stringify(payload);
          if (payloadStr.includes('暴雨') || payloadStr.includes('heavy_rain')) {
            if (payloadStr.includes('TrafficManager')) return '暴雨天气交通紧急响应';
            if (payloadStr.includes('SafetyAgent')) return '暴雨天气安全紧急响应';
          }
        }
        return '智能体响应';
    }
  };

  if (!selectedEvent || interactionFlow.length === 0) {
    return (
      <div className="agent-interaction-flow">
        <div className="flow-placeholder">
          <div className="placeholder-icon">🤖</div>
          <div className="placeholder-text">选择左侧事件查看智能体交互流程</div>
        </div>
      </div>
    );
  }

  return (
    <div className="agent-interaction-flow">
      <div className="flow-header">
        <h3>🤖 智能体交互流程</h3>
        <div className="flow-info">
          共 {interactionFlow.length} 个步骤
        </div>
      </div>
      
      <div className="flow-timeline">
        {interactionFlow.map((step, index) => {
          const agent = agentConfig[step.agent] || { name: '未知智能体', icon: '❓', color: '#ccc' };
          
          return (
            <div key={step.id} className="timeline-step completed">
              <div className="step-indicator" style={{ backgroundColor: agent.color }}>
                <div className="step-icon">{agent.icon}</div>
              </div>
              <div className="step-content">
                <div className="step-title">{step.message}</div>
                <div className="step-agent">{agent.name}</div>
                <div className="step-time">
                  {step.timestamp ? new Date(step.timestamp).toLocaleTimeString() : ''}
                </div>
                {step.details && (
                  <div className="step-details">
                    {typeof step.details === 'string' ? step.details.substring(0, 100) + '...' : '详细信息'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentInteractionFlow;
