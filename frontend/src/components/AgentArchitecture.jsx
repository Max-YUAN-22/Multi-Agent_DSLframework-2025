import React from 'react';
import './AgentArchitecture.css';

const AgentArchitecture = () => {
  return (
    <div className="agent-architecture">
      <h3 className="architecture-title">🏛️ 智能体架构 / Agent Architecture</h3>
      
      <div className="architecture-diagram">
        {/* Master Agent */}
        <div className="master-agent">
          <div className="agent-card master">
            <div className="agent-icon">👑</div>
            <div className="agent-info">
              <h4>城市管理主智能体</h4>
              <p>City Manager Master Agent</p>
              <div className="agent-capabilities">
                <span className="capability">协调</span>
                <span className="capability">监控</span>
                <span className="capability">决策</span>
                <span className="capability">分发</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Lines */}
        <div className="connection-lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        {/* Sub Agents */}
        <div className="sub-agents">
          <div className="agent-card sub">
            <div className="agent-icon">🚗</div>
            <div className="agent-info">
              <h4>交通管理子智能体</h4>
              <p>Traffic Manager Sub Agent</p>
              <div className="agent-capabilities">
                <span className="capability">路径规划</span>
                <span className="capability">交通监控</span>
                <span className="capability">信号控制</span>
              </div>
            </div>
          </div>

          <div className="agent-card sub">
            <div className="agent-icon">🌦️</div>
            <div className="agent-info">
              <h4>天气监测子智能体</h4>
              <p>Weather Monitor Sub Agent</p>
              <div className="agent-capabilities">
                <span className="capability">天气监测</span>
                <span className="capability">灾害预警</span>
                <span className="capability">风险评估</span>
              </div>
            </div>
          </div>

          <div className="agent-card sub">
            <div className="agent-icon">🅿️</div>
            <div className="agent-info">
              <h4>停车管理子智能体</h4>
              <p>Parking Manager Sub Agent</p>
              <div className="agent-capabilities">
                <span className="capability">停车监测</span>
                <span className="capability">资源优化</span>
                <span className="capability">动态定价</span>
              </div>
            </div>
          </div>

          <div className="agent-card sub">
            <div className="agent-icon">🔍</div>
            <div className="agent-info">
              <h4>安全监测子智能体</h4>
              <p>Safety Monitor Sub Agent</p>
              <div className="agent-capabilities">
                <span className="capability">安全检查</span>
                <span className="capability">风险监控</span>
                <span className="capability">应急响应</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="architecture-explanation">
        <div className="explanation-section">
          <h4>🎯 Master Agent 职责</h4>
          <ul>
            <li>接收用户任务并分析需求</li>
            <li>制定全局策略和协调方案</li>
            <li>分发任务给相应的子智能体</li>
            <li>监控子智能体执行状态</li>
            <li>汇总结果并生成最终响应</li>
          </ul>
        </div>
        
        <div className="explanation-section">
          <h4>⚡ Sub Agents 职责</h4>
          <ul>
            <li>接收Master Agent的任务分发</li>
            <li>执行专业领域的分析处理</li>
            <li>提供详细的技术响应</li>
            <li>将结果反馈给Master Agent</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgentArchitecture;
