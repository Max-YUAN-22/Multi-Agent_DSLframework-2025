// frontend/src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Tooltip, Button } from '@mui/material';
import { Settings as SettingsIcon, Dashboard as DashboardIcon, SmartToy as SmartToyIcon } from '@mui/icons-material';
import './Header.css';

const Header = () => {
  return (
    <header className="page__header">
      <div className="header-content">
        <div className="header-main">
          <h1 className="main-title">Multi-Agent DSL Framework</h1>
          <div className="header-actions">
            <Tooltip title="智能体交互">
              <Button
                component={Link}
                to="/"
                variant="outlined"
                startIcon={<SmartToyIcon />}
                className="interaction-button"
              >
                智能体交互
              </Button>
            </Tooltip>
            <Tooltip title="企业仪表板">
              <Button
                component={Link}
                to="/dashboard"
                variant="outlined"
                startIcon={<DashboardIcon />}
                className="dashboard-button"
              >
                仪表板
              </Button>
            </Tooltip>
            <Tooltip title="系统设置">
              <IconButton
                component={Link}
                to="/settings"
                className="settings-button"
                size="large"
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <h2 className="subtitle">Intelligent City Management & Autonomous Driving Coordination</h2>
        <p className="description">A real-time multi-agent system powered by Domain-Specific Language (DSL) orchestration</p>
      </div>
    </header>
  );
};

export default Header;