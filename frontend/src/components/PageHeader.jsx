import React from 'react';
import './PageHeader.css';

const PageHeader = () => {
  return (
    <header className="page-header">
      <div className="header-content">
        <div className="header-main">
          <h1 className="main-title">Multi-Agent DSL Framework</h1>
          <p className="subtitle">Intelligent City Management & Autonomous Driving Coordination</p>
        </div>
        
        <div className="header-actions">
          <a 
            href="https://github.com/Max-YUAN-22/Final-DSL" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
          >
            <span className="github-icon">🔗</span>
            <span className="github-text">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;