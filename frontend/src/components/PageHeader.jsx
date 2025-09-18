import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import './PageHeader.css';

const PageHeader = () => {
  return (
    <Box className="page-header">
      <div className="header-background">
        <div className="header-particles"></div>
        <div className="header-glow"></div>
      </div>
      
      <div className="header-content">
        <div className="header-icon">
          <div className="icon-container">
            <div className="icon-core">
              <div className="icon-ring"></div>
              <div className="icon-center">🤖</div>
            </div>
          </div>
        </div>
        
        <div className="header-text">
          <Typography variant="h1" className="main-title">
            <span className="title-primary">多智能体</span>
            <span className="title-secondary">DSL框架</span>
          </Typography>
          
          <Typography variant="h2" className="subtitle">
            Multi-Agent Domain-Specific Language Framework
          </Typography>
          
          <div className="title-description">
            <Typography variant="body1" className="description-text">
              基于领域特定语言的多智能体协作系统演示平台
            </Typography>
            <Typography variant="body2" className="description-en">
              Advanced Multi-Agent Collaboration Platform with DSL Orchestration
            </Typography>
          </div>
          
          <div className="feature-tags">
            <Chip 
              label="智能体协作" 
              className="feature-chip primary"
              size="small"
            />
            <Chip 
              label="DSL编排" 
              className="feature-chip secondary"
              size="small"
            />
            <Chip 
              label="实时通信" 
              className="feature-chip accent"
              size="small"
            />
            <Chip 
              label="分层架构" 
              className="feature-chip highlight"
              size="small"
            />
            <a 
              href="https://github.com/Max-YUAN-22/Final-DSL" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-link"
            >
              <Chip 
                label="GitHub 项目" 
                className="feature-chip github"
                size="small"
                icon={<span>🔗</span>}
              />
            </a>
          </div>
        </div>
      </div>
      
      <div className="header-decoration">
        <div className="decoration-line left"></div>
        <div className="decoration-line right"></div>
        <div className="decoration-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
    </Box>
  );
};

export default PageHeader;
