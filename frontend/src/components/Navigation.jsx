import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  SmartToy as SmartToyIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: '智能体交互',
      icon: <SmartToyIcon />,
      description: 'DSL多智能体交互界面'
    },
    {
      path: '/dashboard',
      label: '企业仪表板',
      icon: <DashboardIcon />,
      description: '系统监控和性能指标'
    },
    {
      path: '/settings',
      label: '系统设置',
      icon: <SettingsIcon />,
      description: 'API配置和系统管理'
    }
  ];

  return (
    <AppBar position="static" className="navigation-bar">
      <Toolbar className="navigation-toolbar">
        <Typography variant="h6" component="div" className="nav-title">
          多智能体DSL框架
        </Typography>
        
        <Box className="nav-buttons">
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              className={`nav-button ${location.pathname === item.path ? 'active' : ''}`}
              title={item.description}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
