import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, Typography, Container, AppBar, Toolbar, Button, Card, CardContent, 
  Grid, Chip, Paper, Stepper, Step, StepLabel, StepContent, Alert, 
  LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, 
  IconButton, Avatar, List, ListItem, ListItemAvatar, ListItemText, 
  ListItemSecondaryAction, Switch, FormControlLabel, Divider, Fab,
  Fade, Slide, Zoom, Grow, Collapse, Skeleton, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tabs, Tab, Accordion, AccordionSummary, AccordionDetails,
  Snackbar, Alert as MuiAlert, Badge, Tooltip, TextField
} from '@mui/material';
import { 
  Science as ScienceIcon, Code as CodeIcon, School as SchoolIcon, 
  Dashboard as DashboardIcon, PlayArrow as PlayIcon, CheckCircle as CheckCircleIcon, 
  Close as CloseIcon, Info as InfoIcon, Group as GroupIcon, History as HistoryIcon, 
  Settings as SettingsIcon, Chat as ChatIcon, Visibility as VisibilityIcon, 
  Add as AddIcon, ExpandMore as ExpandMoreIcon, Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon, Memory as MemoryIcon, Speed as SpeedIcon,
  Security as SecurityIcon, Cloud as CloudIcon, Analytics as AnalyticsIcon,
  Timeline as TimelineIcon, Assessment as AssessmentIcon, ShowChart as ShowChartIcon
} from '@mui/icons-material';
import { io } from 'socket.io-client';

// 企业级主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: { 
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: { 
      default: '#f5f5f5', 
      paper: '#ffffff' 
    },
    success: { main: '#4caf50' },
    warning: { main: '#ff9800' },
    error: { main: '#f44336' },
    info: { main: '#2196f3' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
  },
});

// WebSocket连接管理
class WebSocketManager {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect() {
    try {
      // 连接到后端WebSocket服务
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://multi-agent-dsl-backend.railway.app';
      this.socket = io(backendUrl, {
        transports: ['websocket'],
        timeout: 5000,
      });
      
      this.socket.on('connect', () => {
        console.log('WebSocket连接成功');
        this.reconnectAttempts = 0;
        this.emit('connected');
      });

      this.socket.on('disconnect', () => {
        console.log('WebSocket连接关闭');
        this.emit('disconnected');
        this.reconnect();
      });

      this.socket.on('connect_error', (error) => {
        console.error('WebSocket连接错误:', error);
        this.emit('error', error);
        this.reconnect();
      });

      // 监听自定义事件
      this.socket.on('agent_update', (data) => {
        this.emit('message', { type: 'agent_update', ...data });
      });

      this.socket.on('interaction', (data) => {
        this.emit('message', { type: 'interaction', interaction: data });
      });

    } catch (error) {
      console.error('WebSocket连接失败:', error);
      this.reconnect();
    }
  }

  reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`尝试重连WebSocket (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => this.connect(), 2000 * this.reconnectAttempts);
    }
  }

  send(data) {
    if (this.socket && this.socket.connected) {
      this.socket.emit('message', data);
    }
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

// API管理器
class APIManager {
  constructor() {
    this.baseURL = process.env.REACT_APP_BACKEND_URL || 'https://multi-agent-dsl-backend.railway.app';
  }

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API请求失败:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// 全局WebSocket管理器
const wsManager = new WebSocketManager();

// 全局API管理器
const apiManager = new APIManager();

// 导航组件
function Navigation() {
  const navigate = useNavigate();
  
  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ScienceIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            多智能体DSL框架
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button color="inherit" startIcon={<CodeIcon />} onClick={() => navigate('/dsl-demo')}>
            DSL演示
          </Button>
          <Button color="inherit" startIcon={<GroupIcon />} onClick={() => navigate('/agents')}>
            智能体管理
          </Button>
          <Button color="inherit" startIcon={<HistoryIcon />} onClick={() => navigate('/interactions')}>
            交互记录
          </Button>
          <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => navigate('/dashboard')}>
            企业仪表板
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// 智能体管理页面（带实时更新和动画效果）
function AgentsPage() {
  const [agents, setAgents] = React.useState([
    { id: 1, name: 'Weather Agent', status: 'active', avatar: '🌤️', tasks: 23, efficiency: 96, cpu: 45, memory: 67, lastUpdate: Date.now() },
    { id: 2, name: 'Traffic Agent', status: 'active', avatar: '🚦', tasks: 45, efficiency: 94, cpu: 52, memory: 73, lastUpdate: Date.now() },
    { id: 3, name: 'Parking Agent', status: 'active', avatar: '🅿️', tasks: 18, efficiency: 98, cpu: 38, memory: 45, lastUpdate: Date.now() },
    { id: 4, name: 'Safety Agent', status: 'warning', avatar: '🛡️', tasks: 12, efficiency: 89, cpu: 67, memory: 82, lastUpdate: Date.now() },
    { id: 5, name: 'EMS Agent', status: 'active', avatar: '🏥', tasks: 8, efficiency: 95, cpu: 41, memory: 58, lastUpdate: Date.now() },
    { id: 6, name: 'Enforcement Agent', status: 'active', avatar: '🚨', tasks: 15, efficiency: 92, cpu: 49, memory: 61, lastUpdate: Date.now() },
    { id: 7, name: 'Sanitation Agent', status: 'active', avatar: '🧹', tasks: 22, efficiency: 97, cpu: 43, memory: 55, lastUpdate: Date.now() },
    { id: 8, name: 'Sprinkler Agent', status: 'active', avatar: '💧', tasks: 6, efficiency: 99, cpu: 35, memory: 42, lastUpdate: Date.now() },
    { id: 9, name: 'AutoDrive Agent', status: 'active', avatar: '🚗', tasks: 35, efficiency: 93, cpu: 58, memory: 71, lastUpdate: Date.now() },
    { id: 10, name: 'City Manager Agent', status: 'active', avatar: '🏙️', tasks: 28, efficiency: 96, cpu: 46, memory: 63, lastUpdate: Date.now() },
    { id: 11, name: 'Perception Agent', status: 'active', avatar: '👁️', tasks: 41, efficiency: 94, cpu: 54, memory: 68, lastUpdate: Date.now() },
    { id: 12, name: 'Analytics Agent', status: 'active', avatar: '📊', tasks: 19, efficiency: 97, cpu: 39, memory: 52, lastUpdate: Date.now() },
  ]);

  const [wsConnected, setWsConnected] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedAgent, setSelectedAgent] = React.useState(null);
  const [agentDetailsOpen, setAgentDetailsOpen] = React.useState(false);
  const [animatingAgents, setAnimatingAgents] = React.useState(new Set());
  const [recentActivities, setRecentActivities] = React.useState([]);

  React.useEffect(() => {
    // 连接WebSocket
    wsManager.connect();
    
    // 监听WebSocket事件
    wsManager.on('connected', () => {
      setWsConnected(true);
      console.log('WebSocket已连接');
    });

    wsManager.on('disconnected', () => {
      setWsConnected(false);
      console.log('WebSocket已断开');
    });

    wsManager.on('message', (data) => {
      console.log('收到WebSocket消息:', data);
      // 处理实时数据更新
      if (data.type === 'agent_update') {
        setAgents(prevAgents => 
          prevAgents.map(agent => 
            agent.id === data.agentId 
              ? { ...agent, ...data.update, lastUpdate: Date.now() }
              : agent
          )
        );
      }
    });

    // 模拟实时数据更新和动画效果
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const newTasks = Math.max(0, randomAgent.tasks + Math.floor(Math.random() * 3) - 1);
      const newEfficiency = Math.max(80, Math.min(100, randomAgent.efficiency + Math.floor(Math.random() * 6) - 3));
      const newCpu = Math.max(20, Math.min(90, randomAgent.cpu + Math.floor(Math.random() * 10) - 5));
      const newMemory = Math.max(30, Math.min(95, randomAgent.memory + Math.floor(Math.random() * 8) - 4));
      
      // 添加动画效果
      setAnimatingAgents(prev => new Set([...prev, randomAgent.id]));
      
      // 添加活动记录
      const activity = {
        id: Date.now(),
        agent: randomAgent.name,
        action: '数据更新',
        time: new Date().toLocaleString('zh-CN'),
        type: 'update'
      };
      setRecentActivities(prev => [activity, ...prev.slice(0, 4)]);
      
      setAgents(prevAgents => 
        prevAgents.map(agent => 
          agent.id === randomAgent.id 
            ? { 
                ...agent, 
                tasks: newTasks, 
                efficiency: newEfficiency, 
                cpu: newCpu, 
                memory: newMemory,
                lastUpdate: Date.now()
              }
            : agent
        )
      );
      
      // 清除动画效果
      setTimeout(() => {
        setAnimatingAgents(prev => {
          const newSet = new Set(prev);
          newSet.delete(randomAgent.id);
          return newSet;
        });
      }, 1000);
    }, 2000);

    return () => {
      clearInterval(interval);
      wsManager.disconnect();
    };
  }, [agents]);

  const handleAgentClick = async (agent) => {
    try {
      // 发送WebSocket消息
      wsManager.send({
        type: 'agent_interaction',
        agentId: agent.id,
        action: 'click',
        timestamp: new Date().toISOString()
      });
      
      // 尝试API调用获取智能体详情
      try {
        const agentDetails = await apiManager.get(`/api/agents/${agent.id}`);
        console.log('智能体详情:', agentDetails);
      } catch (apiError) {
        console.log('API调用失败，使用模拟数据:', apiError.message);
      }
      
      // 添加活动记录
      setRecentActivities(prev => [{
        id: Date.now(),
        agent: agent.name,
        action: '点击查看详情',
        timestamp: new Date().toLocaleTimeString()
      }, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('处理智能体点击失败:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 3 }}>
        <Typography variant="h4">
          智能体管理
        </Typography>
        <Chip 
          label={wsConnected ? '实时连接' : '离线模式'} 
          color={wsConnected ? 'success' : 'default'}
          icon={wsConnected ? <CheckCircleIcon /> : <CloseIcon />}
        />
      </Box>
      
      <Grid container spacing={3}>
        {agents.map((agent, index) => (
          <Grid item xs={12} sm={6} md={4} key={agent.id}>
            <Fade in={true} timeout={300 + index * 100}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: animatingAgents.has(agent.id) 
                    ? 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)'
                    : 'white',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transition: 'left 0.5s',
                    ...(animatingAgents.has(agent.id) && {
                      left: '100%',
                    }),
                  },
                }}
                onClick={() => handleAgentClick(agent)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Zoom in={true} timeout={500 + index * 100}>
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          fontSize: '1.5rem',
                          background: animatingAgents.has(agent.id) 
                            ? 'linear-gradient(45deg, #2196f3, #21cbf3)'
                            : 'linear-gradient(45deg, #1976d2, #42a5f5)',
                          animation: animatingAgents.has(agent.id) ? 'pulse 1s ease-in-out' : 'none',
                          '@keyframes pulse': {
                            '0%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.1)' },
                            '100%': { transform: 'scale(1)' },
                          },
                        }}
                      >
                        {agent.avatar}
                      </Avatar>
                    </Zoom>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {agent.name}
                      </Typography>
                      <Chip 
                        label={agent.status} 
                        color={agent.status === 'active' ? 'success' : 'warning'}
                        size="small"
                        sx={{ 
                          animation: animatingAgents.has(agent.id) ? 'glow 1s ease-in-out' : 'none',
                          '@keyframes glow': {
                            '0%': { boxShadow: '0 0 5px rgba(76, 175, 80, 0.5)' },
                            '50%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.8)' },
                            '100%': { boxShadow: '0 0 5px rgba(76, 175, 80, 0.5)' },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      任务数量: <strong>{agent.tasks}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      效率: <strong>{agent.efficiency}%</strong>
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={agent.efficiency} 
                      sx={{ 
                        mt: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`CPU: ${agent.cpu}%`} 
                      size="small" 
                      color={agent.cpu > 80 ? 'error' : agent.cpu > 60 ? 'warning' : 'success'}
                      variant="outlined"
                    />
                    <Chip 
                      label={`内存: ${agent.memory}%`} 
                      size="small" 
                      color={agent.memory > 80 ? 'error' : agent.memory > 60 ? 'warning' : 'success'}
                      variant="outlined"
                    />
                  </Box>

                  {animatingAgents.has(agent.id) && (
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 8, 
                      right: 8,
                      animation: 'spin 1s linear infinite',
                      '@keyframes spin': {
                        '0%': { transform: 'rotate(0deg)' },
                        '100%': { transform: 'rotate(360deg)' },
                      },
                    }}>
                      <CircularProgress size={20} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* 最近活动 */}
      {recentActivities.length > 0 && (
        <Fade in={true} timeout={500}>
          <Card sx={{ mt: 3, background: 'linear-gradient(135deg, #f5f5f5 0%, #e8f5e8 100%)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color="primary" />
                最近活动
              </Typography>
              <List dense>
                {recentActivities.map((activity, index) => (
                  <Slide direction="up" in={true} timeout={300 + index * 100} key={activity.id}>
                    <ListItem>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {activity.agent.includes('Weather') ? '🌤️' : 
                         activity.agent.includes('Traffic') ? '🚦' :
                         activity.agent.includes('Parking') ? '🅿️' :
                         activity.agent.includes('Safety') ? '🛡️' : '🏥'}
                      </Avatar>
                      <ListItemText
                        primary={activity.agent}
                        secondary={`${activity.action} - ${activity.time}`}
                      />
                      <Chip 
                        label="实时" 
                        color="success" 
                        size="small"
                        sx={{ animation: 'pulse 2s infinite' }}
                      />
                    </ListItem>
                  </Slide>
                ))}
              </List>
            </CardContent>
          </Card>
        </Fade>
      )}
    </Container>
  );
}

// 交互记录页面（带实时更新）
function InteractionsPage() {
  const [interactions, setInteractions] = React.useState([
    { id: 1, agent: 'Weather Agent', action: '天气预警', time: '2025-01-19 23:45:12', status: 'completed' },
    { id: 2, agent: 'Traffic Agent', action: '交通优化', time: '2025-01-19 23:44:30', status: 'completed' },
    { id: 3, agent: 'Parking Agent', action: '停车位分配', time: '2025-01-19 23:43:15', status: 'completed' },
    { id: 4, agent: 'Safety Agent', action: '安全检查', time: '2025-01-19 23:42:08', status: 'warning' },
    { id: 5, agent: 'EMS Agent', action: '紧急响应', time: '2025-01-19 23:41:22', status: 'completed' },
  ]);

  const [wsConnected, setWsConnected] = React.useState(false);

  React.useEffect(() => {
    wsManager.on('connected', () => setWsConnected(true));
    wsManager.on('disconnected', () => setWsConnected(false));
    
    wsManager.on('message', (data) => {
      if (data.type === 'interaction') {
        setInteractions(prev => [data.interaction, ...prev.slice(0, 9)]);
      }
    });

    // 模拟实时交互
    const interval = setInterval(() => {
      const agents = ['Weather Agent', 'Traffic Agent', 'Parking Agent', 'Safety Agent', 'EMS Agent'];
      const actions = ['数据更新', '状态检查', '任务执行', '异常处理', '性能优化'];
      const statuses = ['completed', 'warning', 'completed', 'completed', 'completed'];
      
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      const newInteraction = {
        id: Date.now(),
        agent: randomAgent,
        action: randomAction,
        time: new Date().toLocaleString('zh-CN'),
        status: randomStatus
      };
      
      setInteractions(prev => [newInteraction, ...prev.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 3 }}>
        <Typography variant="h4">
          交互记录
        </Typography>
        <Chip 
          label={wsConnected ? '实时更新' : '离线模式'} 
          color={wsConnected ? 'success' : 'default'}
          icon={wsConnected ? <CheckCircleIcon /> : <CloseIcon />}
        />
      </Box>
      
      <Card>
        <CardContent>
          <List>
            {interactions.map((interaction, index) => (
              <React.Fragment key={interaction.id}>
                <ListItem>
                  <Avatar sx={{ mr: 2 }}>
                    {interaction.agent.includes('Weather') ? '🌤️' : 
                     interaction.agent.includes('Traffic') ? '🚦' :
                     interaction.agent.includes('Parking') ? '🅿️' :
                     interaction.agent.includes('Safety') ? '🛡️' : '🏥'}
                  </Avatar>
                  <ListItemText
                    primary={interaction.agent}
                    secondary={`${interaction.action} - ${interaction.time}`}
                  />
                  <Chip 
                    label={interaction.status} 
                    color={interaction.status === 'completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </ListItem>
                {index < interactions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
}

// 首页组件
function HomePage() {
  return (
    <Box>
      <Box sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        color: 'white',
        py: 8,
        mb: 6,
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
            多智能体DSL框架
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom sx={{ opacity: 0.9, mb: 3, textAlign: 'center' }}>
            企业级自适应调度与协作学习解决方案
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ATSLP算法
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  自适应任务调度与负载预测，实现2.17x吞吐量提升
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  HCMPL算法
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  分层缓存管理与模式学习，实现85%+缓存命中率
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  CALK算法
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  协作智能体学习与知识转移，实现40-60%延迟减少
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// DSL演示页面 - 企业级多智能体DSL框架演示
function DSLDemoPage() {
  const [selectedDemo, setSelectedDemo] = React.useState('conversation');
  const [conversationHistory, setConversationHistory] = React.useState([
    { id: 1, type: 'user', message: '你好，我想了解多智能体DSL框架', timestamp: new Date().toLocaleTimeString() },
    { id: 2, type: 'agent', message: '您好！我是多智能体DSL框架的智能助手。我可以帮您了解ATSLP、HCMPL和CALK等核心技术。您想了解哪个方面？', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [knowledgeGraph, setKnowledgeGraph] = React.useState({
    nodes: [
      { id: 'dsl', label: 'DSL框架', group: 'core', x: 0, y: 0 },
      { id: 'atslp', label: 'ATSLP', group: 'tech', x: -100, y: -100 },
      { id: 'hcmpl', label: 'HCMPL', group: 'tech', x: 100, y: -100 },
      { id: 'calk', label: 'CALK', group: 'tech', x: 0, y: -200 },
      { id: 'agents', label: '智能体', group: 'system', x: -150, y: 100 },
      { id: 'scheduler', label: '调度器', group: 'system', x: 150, y: 100 },
      { id: 'learning', label: '协作学习', group: 'system', x: 0, y: 200 }
    ],
    links: [
      { source: 'dsl', target: 'atslp' },
      { source: 'dsl', target: 'hcmpl' },
      { source: 'dsl', target: 'calk' },
      { source: 'atslp', target: 'agents' },
      { source: 'hcmpl', target: 'scheduler' },
      { source: 'calk', target: 'learning' }
    ]
  });

  const demos = [
    { id: 'conversation', title: '智能对话', icon: <ChatIcon />, description: '基于自然语言理解的智能对话系统' },
    { id: 'knowledge', title: '知识图谱', icon: <ScienceIcon />, description: '多智能体知识关联与推理' },
    { id: 'scheduling', title: '智能调度', icon: <DashboardIcon />, description: '自适应任务调度与资源分配' },
    { id: 'learning', title: '协作学习', icon: <SchoolIcon />, description: '多智能体协作学习与优化' }
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setConversationHistory(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // 模拟AI回复
    setTimeout(() => {
      const responses = [
        '这是一个很好的问题！多智能体DSL框架通过ATSLP实现自适应任务调度，通过HCMPL进行层次化协作管理，通过CALK实现协作学习优化。',
        '您提到的技术点非常关键。我们的框架支持动态负载均衡和智能资源分配，能够根据实时情况调整智能体的工作模式。',
        '协作学习是我们框架的核心特色。多个智能体可以共享经验，相互学习，不断提升整体性能。',
        '知识图谱技术帮助我们构建智能体之间的关联关系，实现更精准的协作和推理。'
      ];
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'agent',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString()
      };
      
      setConversationHistory(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const renderConversationDemo = () => (
    <Box sx={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', p: 2, border: '1px solid #e0e0e0', borderRadius: 1, mb: 2 }}>
        {conversationHistory.map((msg) => (
          <Box key={msg.id} sx={{ mb: 2, display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
            <Card sx={{ 
              maxWidth: '70%', 
              bgcolor: msg.type === 'user' ? 'primary.main' : 'grey.100',
              color: msg.type === 'user' ? 'white' : 'text.primary'
            }}>
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2">{msg.message}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, fontSize: '0.7rem' }}>
                  {msg.timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
        {isTyping && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <Card sx={{ bgcolor: 'grey.100' }}>
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2">AI正在思考中...</Typography>
                <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                  <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                  <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                  <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="输入您的问题..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button variant="contained" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
          发送
        </Button>
      </Box>
    </Box>
  );

  const renderKnowledgeGraph = () => (
    <Box sx={{ height: '500px', position: 'relative', border: '1px solid #e0e0e0', borderRadius: 1, overflow: 'hidden' }}>
      <svg width="100%" height="100%" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        {/* 绘制连接线 */}
        {knowledgeGraph.links.map((link, index) => {
          const source = knowledgeGraph.nodes.find(n => n.id === link.source);
          const target = knowledgeGraph.nodes.find(n => n.id === link.target);
          if (!source || !target) return null;
          
          const x1 = 200 + source.x;
          const y1 = 250 + source.y;
          const x2 = 200 + target.x;
          const y2 = 250 + target.y;
          
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#1976d2"
              strokeWidth="2"
              opacity="0.6"
            />
          );
        })}
        
        {/* 绘制节点 */}
        {knowledgeGraph.nodes.map((node) => {
          const x = 200 + node.x;
          const y = 250 + node.y;
          const colors = {
            core: '#1976d2',
            tech: '#dc004e',
            system: '#4caf50'
          };
          
          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={y}
                r="25"
                fill={colors[node.group]}
                stroke="white"
                strokeWidth="3"
                style={{ cursor: 'pointer' }}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* 图例 */}
      <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'white', p: 2, borderRadius: 1, boxShadow: 2 }}>
        <Typography variant="subtitle2" gutterBottom>图例</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#1976d2', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">核心组件</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#dc004e', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">技术模块</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#4caf50', borderRadius: '50%', mr: 1 }} />
          <Typography variant="caption">系统组件</Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderSchedulingDemo = () => (
    <Box sx={{ height: '500px', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>实时调度状态</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>CPU使用率</Typography>
                <LinearProgress variant="determinate" value={65} sx={{ mb: 1 }} />
                <Typography variant="caption">65%</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>内存使用率</Typography>
                <LinearProgress variant="determinate" value={78} color="secondary" sx={{ mb: 1 }} />
                <Typography variant="caption">78%</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>网络带宽</Typography>
                <LinearProgress variant="determinate" value={45} color="success" sx={{ mb: 1 }} />
                <Typography variant="caption">45%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>任务队列</Typography>
              <List dense>
                {[
                  { id: 1, name: '数据处理任务', priority: 'high', progress: 80 },
                  { id: 2, name: '模型训练任务', priority: 'medium', progress: 45 },
                  { id: 3, name: 'API调用任务', priority: 'low', progress: 20 },
                  { id: 4, name: '日志分析任务', priority: 'medium', progress: 90 }
                ].map((task) => (
                  <ListItem key={task.id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={task.name}
                      secondary={
                        <Box>
                          <Chip 
                            label={task.priority} 
                            size="small" 
                            color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'default'}
                            sx={{ mr: 1 }}
                          />
                          <LinearProgress variant="determinate" value={task.progress} sx={{ mt: 1 }} />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderLearningDemo = () => (
    <Box sx={{ height: '500px', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>协作学习进度</Typography>
              <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={120} thickness={4} />
                  <Typography variant="h4" sx={{ mt: 2 }}>87%</Typography>
                  <Typography variant="body2" color="text.secondary">整体学习进度</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>学习统计</Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">知识共享次数</Typography>
                  <Typography variant="h6" color="primary">1,247</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">协作任务数</Typography>
                  <Typography variant="h6" color="secondary">89</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">性能提升</Typography>
                  <Typography variant="h6" color="success">23%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">学习效率</Typography>
                  <Typography variant="h6" color="info">94%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          多智能体DSL框架演示
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          体验企业级多智能体协作学习与自适应调度系统
        </Typography>
      </Box>

      {/* 演示选择器 */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          {demos.map((demo) => (
            <Grid item xs={12} sm={6} md={3} key={demo.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: selectedDemo === demo.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  '&:hover': { boxShadow: 4 }
                }}
                onClick={() => setSelectedDemo(demo.id)}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Box sx={{ color: 'primary.main', mb: 1 }}>
                    {demo.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {demo.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {demo.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 演示内容 */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          {selectedDemo === 'conversation' && renderConversationDemo()}
          {selectedDemo === 'knowledge' && renderKnowledgeGraph()}
          {selectedDemo === 'scheduling' && renderSchedulingDemo()}
          {selectedDemo === 'learning' && renderLearningDemo()}
        </CardContent>
      </Card>

      {/* 技术特色 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <ScienceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                ATSLP技术
              </Typography>
              <Typography variant="body2" color="text.secondary">
                自适应任务调度与负载均衡，根据实时情况动态调整智能体工作模式
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <GroupIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                HCMPL技术
              </Typography>
              <Typography variant="body2" color="text.secondary">
                层次化协作管理与协议学习，实现多智能体间的智能协作
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                CALK技术
              </Typography>
              <Typography variant="body2" color="text.secondary">
                协作学习与知识共享，让智能体相互学习，不断提升整体性能
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// 企业仪表板页面
function DashboardPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        企业仪表板
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">系统吞吐量</Typography>
              <Typography variant="h4" color="primary">2.17x</Typography>
              <Typography variant="body2" color="text.secondary">vs AutoGen</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">缓存命中率</Typography>
              <Typography variant="h4" color="secondary">85%+</Typography>
              <Typography variant="body2" color="text.secondary">HCMPL算法</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">延迟减少</Typography>
              <Typography variant="h4" color="success">40-60%</Typography>
              <Typography variant="body2" color="text.secondary">CALK算法</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">智能体支持</Typography>
              <Typography variant="h4" color="warning">1000+</Typography>
              <Typography variant="body2" color="text.secondary">并发处理</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// 主应用组件
function App() {
  return (
    <BrowserRouter basename="/Multi-Agent_DSLframework-2025">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dsl-demo" element={<DSLDemoPage />} />
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/interactions" element={<InteractionsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);