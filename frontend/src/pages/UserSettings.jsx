import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Container
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Security as SecurityIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import APIConfig from '../components/APIConfig';
import './UserSettings.css';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const UserSettings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className="user-settings-container">
      <Paper elevation={3} className="settings-paper">
        <Box className="settings-header">
          <Typography variant="h4" component="h1" className="settings-title">
            系统设置
          </Typography>
          <Typography variant="body1" color="text.secondary" className="settings-subtitle">
            配置您的多智能体DSL框架
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="设置选项卡"
            className="settings-tabs"
          >
            <Tab
              icon={<SettingsIcon />}
              label="API 配置"
              iconPosition="start"
              {...a11yProps(0)}
            />
            <Tab
              icon={<SecurityIcon />}
              label="安全设置"
              iconPosition="start"
              {...a11yProps(1)}
            />
            <Tab
              icon={<AccountIcon />}
              label="账户信息"
              iconPosition="start"
              {...a11yProps(2)}
            />
            <Tab
              icon={<NotificationsIcon />}
              label="通知设置"
              iconPosition="start"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <APIConfig />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box className="security-settings">
            <Typography variant="h6" gutterBottom>
              安全设置
            </Typography>
            <Typography variant="body2" color="text.secondary">
              安全功能正在开发中...
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Box className="account-settings">
            <Typography variant="h6" gutterBottom>
              账户信息
            </Typography>
            <Typography variant="body2" color="text.secondary">
              账户管理功能正在开发中...
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Box className="notification-settings">
            <Typography variant="h6" gutterBottom>
              通知设置
            </Typography>
            <Typography variant="body2" color="text.secondary">
              通知功能正在开发中...
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default UserSettings;
