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
  ListItemSecondaryAction, Switch, FormControlLabel, Divider, Fab
} from '@mui/material';
import { 
  Science as ScienceIcon, Code as CodeIcon, School as SchoolIcon, 
  Dashboard as DashboardIcon, PlayArrow as PlayIcon, CheckCircle as CheckCircleIcon, 
  Close as CloseIcon, Info as InfoIcon, Group as GroupIcon, History as HistoryIcon, 
  Settings as SettingsIcon, Chat as ChatIcon, Visibility as VisibilityIcon, 
  Add as AddIcon
} from '@mui/icons-material';
import { io } from 'socket.io-client';

// 企业级主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
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
      this.socket = io('http://localhost:8000', {
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

// 全局WebSocket管理器
const wsManager = new WebSocketManager();

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

// 智能体管理页面（带实时更新）
function AgentsPage() {
  const [agents, setAgents] = React.useState([
    { id: 1, name: 'Weather Agent', status: 'active', avatar: '🌤️', tasks: 23, efficiency: 96 },
    { id: 2, name: 'Traffic Agent', status: 'active', avatar: '🚦', tasks: 45, efficiency: 94 },
    { id: 3, name: 'Parking Agent', status: 'active', avatar: '🅿️', tasks: 18, efficiency: 98 },
    { id: 4, name: 'Safety Agent', status: 'warning', avatar: '🛡️', tasks: 12, efficiency: 89 },
    { id: 5, name: 'EMS Agent', status: 'active', avatar: '🏥', tasks: 8, efficiency: 95 },
    { id: 6, name: 'Enforcement Agent', status: 'active', avatar: '🚨', tasks: 15, efficiency: 92 },
    { id: 7, name: 'Sanitation Agent', status: 'active', avatar: '🧹', tasks: 22, efficiency: 97 },
    { id: 8, name: 'Sprinkler Agent', status: 'active', avatar: '💧', tasks: 6, efficiency: 99 },
    { id: 9, name: 'AutoDrive Agent', status: 'active', avatar: '🚗', tasks: 35, efficiency: 93 },
    { id: 10, name: 'City Manager Agent', status: 'active', avatar: '🏙️', tasks: 28, efficiency: 96 },
    { id: 11, name: 'Perception Agent', status: 'active', avatar: '👁️', tasks: 41, efficiency: 94 },
    { id: 12, name: 'Analytics Agent', status: 'active', avatar: '📊', tasks: 19, efficiency: 97 },
  ]);

  const [wsConnected, setWsConnected] = React.useState(false);

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
              ? { ...agent, ...data.update }
              : agent
          )
        );
      }
    });

    // 模拟实时数据更新
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const newTasks = Math.max(0, randomAgent.tasks + Math.floor(Math.random() * 3) - 1);
      const newEfficiency = Math.max(80, Math.min(100, randomAgent.efficiency + Math.floor(Math.random() * 6) - 3));
      
      setAgents(prevAgents => 
        prevAgents.map(agent => 
          agent.id === randomAgent.id 
            ? { ...agent, tasks: newTasks, efficiency: newEfficiency }
            : agent
        )
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      wsManager.disconnect();
    };
  }, []);

  const handleAgentClick = (agent) => {
    // 发送WebSocket消息
    wsManager.send({
      type: 'agent_interaction',
      agentId: agent.id,
      action: 'click',
      timestamp: new Date().toISOString()
    });
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
      
      <Grid container spacing={2}>
        {agents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                }
              }}
              onClick={() => handleAgentClick(agent)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, fontSize: '1.5rem' }}>
                    {agent.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{agent.name}</Typography>
                    <Chip 
                      label={agent.status} 
                      color={agent.status === 'active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  任务数量: {agent.tasks}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  效率: {agent.efficiency}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={agent.efficiency} 
                  sx={{ mt: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
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

// DSL演示页面
function DSLDemoPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        DSL演示
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1">
            DSL演示功能正在开发中...
          </Typography>
        </CardContent>
      </Card>
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
    <BrowserRouter>
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