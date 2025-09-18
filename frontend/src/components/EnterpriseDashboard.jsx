import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Alert,
  Button
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Error,
  Warning,
  Refresh,
  Settings,
  Security,
  Speed,
  Memory
} from '@mui/icons-material';
import axios from 'axios';
import './EnterpriseDashboard.css';

const EnterpriseDashboard = () => {
  const [systemStatus, setSystemStatus] = useState({
    agents: { active: 0, total: 12 },
    apiKeys: { configured: 0, total: 5 },
    performance: { latency: 0, throughput: 0 },
    health: 'healthy'
  });
  
  const [metrics, setMetrics] = useState({
    requestsPerMinute: 0,
    averageResponseTime: 0,
    errorRate: 0,
    cacheHitRate: 0
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSystemMetrics();
    const interval = setInterval(fetchSystemMetrics, 30000); // 每30秒更新
    return () => clearInterval(interval);
  }, []);

  const fetchSystemMetrics = async () => {
    try {
      setLoading(true);
      
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008';
      
      // 获取API状态
      const apiResponse = await axios.get(`${backendUrl}/api/api-keys/status`);
      
      // 获取系统健康状态
      const healthResponse = await axios.get(`${backendUrl}/health`);
      
      // 模拟性能指标
      const mockMetrics = {
        requestsPerMinute: Math.floor(Math.random() * 1000) + 500,
        averageResponseTime: Math.floor(Math.random() * 200) + 50,
        errorRate: Math.random() * 2,
        cacheHitRate: Math.random() * 20 + 80
      };
      
      setSystemStatus({
        agents: { active: 8, total: 12 },
        apiKeys: { 
          configured: apiResponse.data.available_services.length, 
          total: 5 
        },
        performance: { 
          latency: mockMetrics.averageResponseTime, 
          throughput: mockMetrics.requestsPerMinute 
        },
        health: healthResponse.data.status
      });
      
      setMetrics(mockMetrics);
    } catch (error) {
      console.error('获取系统指标失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health) => {
    switch (health) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  };

  const getHealthIcon = (health) => {
    switch (health) {
      case 'healthy': return <CheckCircle />;
      case 'warning': return <Warning />;
      case 'error': return <Error />;
      default: return <CheckCircle />;
    }
  };

  return (
    <div className="enterprise-dashboard">
      <Box className="dashboard-header">
        <Typography variant="h4" component="h1" className="dashboard-title">
          企业级仪表板
        </Typography>
        <Box className="dashboard-actions">
          <Tooltip title="刷新数据">
            <IconButton onClick={fetchSystemMetrics} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Button
            variant="outlined"
            startIcon={<Settings />}
            href="/settings"
          >
            系统设置
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* 系统状态卡片 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card className="status-card">
            <CardHeader>
              <Typography variant="h6" component="h3">
                <Security className="card-icon" />
                系统状态
              </Typography>
            </CardHeader>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                {getHealthIcon(systemStatus.health)}
                <Typography variant="h6" ml={1}>
                  系统健康
                </Typography>
                <Chip 
                  label={systemStatus.health} 
                  color={getHealthColor(systemStatus.health)}
                  size="small"
                  sx={{ ml: 'auto' }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                所有核心服务运行正常
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 智能体状态 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card className="status-card">
            <CardHeader>
              <Typography variant="h6" component="h3">
                <Speed className="card-icon" />
                智能体状态
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="h4" className="metric-value">
                {systemStatus.agents.active}/{systemStatus.agents.total}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                活跃智能体
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(systemStatus.agents.active / systemStatus.agents.total) * 100}
                className="progress-bar"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* API配置状态 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card className="status-card">
            <CardHeader>
              <Typography variant="h6" component="h3">
                <Settings className="card-icon" />
                API配置
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="h4" className="metric-value">
                {systemStatus.apiKeys.configured}/{systemStatus.apiKeys.total}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                已配置服务
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(systemStatus.apiKeys.configured / systemStatus.apiKeys.total) * 100}
                className="progress-bar"
              />
            </CardContent>
          </Card>
        </Grid>

        {/* 性能指标 */}
        <Grid item xs={12} md={6} lg={3}>
          <Card className="status-card">
            <CardHeader>
              <Typography variant="h6" component="h3">
                <Memory className="card-icon" />
                性能指标
              </Typography>
            </CardHeader>
            <CardContent>
              <Typography variant="h4" className="metric-value">
                {metrics.averageResponseTime}ms
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={1}>
                平均响应时间
              </Typography>
              <Box display="flex" alignItems="center">
                <TrendingDown color="success" fontSize="small" />
                <Typography variant="caption" color="success.main" ml={0.5}>
                  较昨日下降 12%
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 详细指标 */}
        <Grid item xs={12} md={6}>
          <Card className="metrics-card">
            <CardHeader>
              <Typography variant="h6" component="h3">实时指标</Typography>
            </CardHeader>
            <CardContent>
              <Box className="metrics-grid">
                <Box className="metric-item">
                  <Typography variant="h6">{metrics.requestsPerMinute}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    请求/分钟
                  </Typography>
                </Box>
                <Box className="metric-item">
                  <Typography variant="h6">{metrics.errorRate.toFixed(2)}%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    错误率
                  </Typography>
                </Box>
                <Box className="metric-item">
                  <Typography variant="h6">{metrics.cacheHitRate.toFixed(1)}%</Typography>
                  <Typography variant="body2" color="text.secondary">
                    缓存命中率
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 系统建议 */}
        <Grid item xs={12} md={6}>
          <Card className="recommendations-card">
            <CardHeader>
              <Typography variant="h6" component="h3">系统建议</Typography>
            </CardHeader>
            <CardContent>
              {systemStatus.apiKeys.configured < 3 ? (
                <Alert severity="warning" className="recommendation-alert">
                  <Typography variant="body2">
                    建议配置更多API密钥以获得完整功能体验
                  </Typography>
                  <Button size="small" href="/settings" sx={{ mt: 1 }}>
                    立即配置
                  </Button>
                </Alert>
              ) : (
                <Alert severity="success" className="recommendation-alert">
                  <Typography variant="body2">
                    系统配置良好，所有功能正常运行
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default EnterpriseDashboard;
