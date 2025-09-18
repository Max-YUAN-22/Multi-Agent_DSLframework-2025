import React from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home as HomeIcon,
  Code as CodeIcon,
  School as SchoolIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const navigationItems = [
  { label: '首页', path: '/', icon: HomeIcon },
  { label: 'DSL演示', path: '/dsl-demo', icon: CodeIcon },
  { label: '学术展示', path: '/academic', icon: SchoolIcon },
  { label: '企业仪表板', path: '/dashboard', icon: DashboardIcon },
  { label: '系统设置', path: '/settings', icon: SettingsIcon },
];

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentTab = navigationItems.findIndex(
    item => item.path === location.pathname
  );

  const handleTabChange = (event, newValue) => {
    navigate(navigationItems[newValue].path);
  };

  return (
    <Paper 
      elevation={1}
      sx={{ 
        borderRadius: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ px: isMobile ? 1 : 3 }}>
        <Tabs
          value={currentTab >= 0 ? currentTab : 0}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {navigationItems.map((item, index) => (
            <Tab
              key={index}
              label={item.label}
              icon={<item.icon />}
              iconPosition="start"
              sx={{ 
                minWidth: isMobile ? 'auto' : 120,
                px: isMobile ? 1 : 2,
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Paper>
  );
}

export default Navigation;