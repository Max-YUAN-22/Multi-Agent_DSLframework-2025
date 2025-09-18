import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>多智能体DSL框架</h1>
        <p>自适应调度与协作学习的创新解决方案</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>ATSLP算法</h3>
            <p>自适应任务调度与负载预测</p>
          </div>
          <div className="feature-card">
            <h3>HCMPL算法</h3>
            <p>分层缓存管理与模式学习</p>
          </div>
          <div className="feature-card">
            <h3>CALK算法</h3>
            <p>协作智能体学习与知识转移</p>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <h2>2.17x</h2>
            <p>吞吐量提升</p>
          </div>
          <div className="stat">
            <h2>1000+</h2>
            <p>智能体支持</p>
          </div>
          <div className="stat">
            <h2>85%+</h2>
            <p>缓存命中率</p>
          </div>
          <div className="stat">
            <h2>40-60%</h2>
            <p>延迟减少</p>
          </div>
        </div>

        <div className="actions">
          <button className="btn-primary">开始DSL演示</button>
          <button className="btn-secondary">查看学术论文</button>
        </div>
      </header>
    </div>
  );
}

export default App;