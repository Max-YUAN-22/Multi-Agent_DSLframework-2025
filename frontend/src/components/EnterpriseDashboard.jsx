import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Memory as MemoryIcon,
  Group as GroupIcon,
  Speed as SpeedIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

function EnterpriseDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 模拟实时数据
  const [metrics, setMetrics] = useState({
    activeAgents: 156,
    totalTasks: 2847,
    successRate: 98.5,
    avgResponseTime: 120,
    cacheHitRate: 87.3,
    systemLoad: 45.2,
  });

  const performanceData = [
    { time: '00:00', throughput: 120, latency: 95, cache: 85 },
    { time: '04:00', throughput: 135, latency: 88, cache: 87 },
    { time: '08:00', throughput: 180, latency: 75, cache: 89 },
    { time: '12:00', throughput: 220, latency: 65, cache: 91 },
    { time: '16:00', throughput: 195, latency: 70, cache: 88 },
    { time: '20:00', throughput: 150, latency: 85, cache: 86 },
  ];

  const algorithmPerformance = [
    { name: 'ATSLP', efficiency: 95, usage: 45 },
    { name: 'HCMPL', efficiency: 92, usage: 30 },
    { name: 'CALK', efficiency: 88, usage: 25 },
  ];

  const agentStatus = [
    { name: 'Weather Agent', status: 'active', tasks: 23, efficiency: 96 },
    { name: 'Traffic Agent', status: 'active', tasks: 45, efficiency: 94 },
    { name: 'Parking Agent', status: 'active', tasks: 18, efficiency: 98 },
    { name: 'Safety Agent', status: 'warning', tasks: 12, efficiency: 89 },
    { name: 'EMS Agent', status: 'active', tasks: 8, efficiency: 97 },
  ];

  const recentEvents = [
    { time: '14:32', type: 'success', message: 'ATSLP算法优化完成，吞吐量提升15%' },
    { time: '14:28', type: 'info', message: 'HCMPL缓存命中率达到89%' },
    { time: '14:25', type: 'success', message: 'CALK知识转移完成，学习效率提升' },
    { time: '14:20', type: 'warning', message: 'Safety Agent负载较高，建议优化' },
    { time: '14:15', type: 'success', message: '系统自检完成，所有组件正常' },
  ];

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 10 - 5),
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 50),
        successRate: Math.min(99.9, prev.successRate + Math.random() * 0.5),
        avgResponseTime: Math.max(80, prev.avgResponseTime + Math.random() * 20 - 10),
        cacheHitRate: Math.min(95, prev.cacheHitRate + Math.random() * 2),
        systemLoad: Math.max(20, Math.min(80, prev.systemLoad + Math.random() * 10 - 5)),
      }));
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleIcon color="success" />;
      case 'warning': return <WarningIcon color="warning" />;
      case 'error': return <ErrorIcon color="error" />;
      default: return <AssessmentIcon color="info" />;
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
              企业仪表板
            </Typography>
            <Typography variant="h6" color="text.secondary">
              多智能体DSL框架实时监控与分析
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? '刷新中...' : '刷新数据'}
            </Button>
            <Button
              variant="contained"
              startIcon={<SettingsIcon />}
            >
              系统设置
            </Button>
          </Box>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <GroupIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metrics.activeAgents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  活跃智能体
                </Typography>
                <Chip label="+5.2%" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <TimelineIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metrics.totalTasks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  总任务数
                </Typography>
                <Chip label="+12.8%" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <CheckCircleIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metrics.successRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  成功率
                </Typography>
                <Chip label="+0.3%" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <SpeedIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metrics.avgResponseTime}ms
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  平均响应时间
                </Typography>
                <Chip label="-8.5%" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <MemoryIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metrics.cacheHitRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  缓存命中率
                </Typography>
                <Chip label="+2.1%" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card sx={{ textAlign: 'center', height: '100%' }}>
              <CardContent>
                <TrendingUpIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {metrics.systemLoad}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  系统负载
                </Typography>
                <Chip label="-3.2%" color="success" size="small" sx={{ mt: 1 }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Performance Charts */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  性能趋势分析
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line type="monotone" dataKey="throughput" stroke="#1976d2" strokeWidth={2} name="吞吐量" />
                    <Line type="monotone" dataKey="latency" stroke="#dc004e" strokeWidth={2} name="延迟" />
                    <Line type="monotone" dataKey="cache" stroke="#2e7d32" strokeWidth={2} name="缓存命中率" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  算法效率对比
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={algorithmPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="efficiency" fill="#1976d2" name="效率%" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Agent Status and Recent Events */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  智能体状态监控
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>智能体</TableCell>
                        <TableCell align="center">状态</TableCell>
                        <TableCell align="center">任务数</TableCell>
                        <TableCell align="center">效率</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agentStatus.map((agent, index) => (
                        <TableRow key={index}>
                          <TableCell>{agent.name}</TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={agent.status} 
                              color={getStatusColor(agent.status)} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell align="center">{agent.tasks}</TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={agent.efficiency} 
                                sx={{ width: 60, height: 6 }}
                              />
                              <Typography variant="body2">{agent.efficiency}%</Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  最近事件
                </Typography>
                <List dense>
                  {recentEvents.map((event, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {getEventIcon(event.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={event.message}
                        secondary={event.time}
                        primaryTypographyProps={{ variant: 'body2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* System Status Alert */}
        <Alert 
          severity="info" 
          sx={{ mt: 4 }}
          action={
            <Button color="inherit" size="small">
              查看详情
            </Button>
          }
        >
          <Typography variant="body2">
            系统运行正常。最后更新: {lastUpdate.toLocaleTimeString()}
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
}

export default EnterpriseDashboard;