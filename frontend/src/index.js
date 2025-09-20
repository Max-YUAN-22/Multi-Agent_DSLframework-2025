import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, Typography, Container, AppBar, Toolbar, Button, Card, CardContent, 
  Grid, Chip, LinearProgress, IconButton, Avatar, List, ListItem, 
  ListItemText, Switch, FormControlLabel, Divider, Fade, Slide, Zoom, 
  CircularProgress, TextField
} from '@mui/material';
import { 
  Science as ScienceIcon, Code as CodeIcon, School as SchoolIcon, 
  Dashboard as DashboardIcon, CheckCircle as CheckCircleIcon, 
  Close as CloseIcon, Group as GroupIcon, History as HistoryIcon, 
  Chat as ChatIcon, Timeline as TimelineIcon,
  Mic as MicIcon, MicOff as MicOffIcon, 
  Image as ImageIcon, AttachFile as AttachFileIcon, SentimentSatisfied as SentimentIcon,
  Psychology as PsychologyIcon, RecordVoiceOver as VoiceIcon
} from '@mui/icons-material';
import { io } from 'socket.io-client';

// 企业级主题配置
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0D47A1',
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#E65100',
      light: '#ff833a',
      dark: '#ac1900',
      contrastText: '#ffffff'
    },
    tertiary: {
      main: '#6A1B9A',
      light: '#9c4dcc',
      dark: '#38006b',
      contrastText: '#ffffff'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
      neutral: '#F1F5F9'
    },
    success: {
      main: '#2E7D32',
      light: '#4caf50',
      dark: '#1b5e20'
    },
    warning: {
      main: '#F57F17',
      light: '#ffb300',
      dark: '#e65100'
    },
    error: {
      main: '#C62828',
      light: '#ef5350',
      dark: '#8e0000'
    },
    info: {
      main: '#0277BD',
      light: '#03a9f4',
      dark: '#01579b'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      '@media (max-width:600px)': {
        fontSize: '2.25rem'
      }
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '1.875rem'
      }
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.015em'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '-0.01em'
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.4
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '0px 2px 4px rgba(0,0,0,0.1), 0px 8px 16px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.12), 0px 16px 24px rgba(0,0,0,0.14)',
    '0px 8px 16px rgba(0,0,0,0.14), 0px 24px 40px rgba(0,0,0,0.12)',
    '0px 16px 24px rgba(0,0,0,0.14), 0px 24px 56px rgba(0,0,0,0.12)',
    '0px 24px 32px rgba(0,0,0,0.14), 0px 40px 64px rgba(0,0,0,0.12)',
    '0px 32px 48px rgba(0,0,0,0.14), 0px 48px 80px rgba(0,0,0,0.12)',
    '0px 40px 64px rgba(0,0,0,0.14), 0px 64px 96px rgba(0,0,0,0.12)',
    '0px 48px 80px rgba(0,0,0,0.14), 0px 80px 112px rgba(0,0,0,0.12)',
    '0px 64px 96px rgba(0,0,0,0.14), 0px 96px 128px rgba(0,0,0,0.12)',
    '0px 80px 112px rgba(0,0,0,0.14), 0px 112px 144px rgba(0,0,0,0.12)',
    '0px 96px 128px rgba(0,0,0,0.14), 0px 128px 160px rgba(0,0,0,0.12)',
    '0px 112px 144px rgba(0,0,0,0.14), 0px 144px 176px rgba(0,0,0,0.12)',
    '0px 128px 160px rgba(0,0,0,0.14), 0px 160px 192px rgba(0,0,0,0.12)',
    '0px 144px 176px rgba(0,0,0,0.14), 0px 176px 208px rgba(0,0,0,0.12)',
    '0px 160px 192px rgba(0,0,0,0.14), 0px 192px 224px rgba(0,0,0,0.12)',
    '0px 176px 208px rgba(0,0,0,0.14), 0px 208px 240px rgba(0,0,0,0.12)',
    '0px 192px 224px rgba(0,0,0,0.14), 0px 224px 256px rgba(0,0,0,0.12)',
    '0px 208px 240px rgba(0,0,0,0.14), 0px 240px 272px rgba(0,0,0,0.12)'
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#E0E0E0 transparent',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#E0E0E0',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#BDBDBD',
            }
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: '1px solid rgba(0, 0, 0, 0.08)',
          background: 'linear-gradient(145deg, #ffffff 0%, #fafafa 100%)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            zIndex: 1
          },
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          },
          '&.MuiButton-contained': {
            background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #002171 0%, #0D47A1 100%)',
              boxShadow: '0 12px 30px rgba(13, 71, 161, 0.4)',
            }
          }
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 50%, #42A5F5 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(13, 71, 161, 0.3)',
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 8,
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(90deg, #4CAF50, #8BC34A)',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 8px 25px rgba(13, 71, 161, 0.2)',
            }
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 0',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(13, 71, 161, 0.05)',
            transform: 'translateX(4px)',
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }
      }
    }
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
          <Button color="inherit" startIcon={<VoiceIcon />} onClick={() => navigate('/multimodal')}>
            多模态交互
          </Button>
          <Button color="inherit" startIcon={<PsychologyIcon />} onClick={() => navigate('/knowledge-graph')}>
            知识图谱
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

// 企业级首页组件
function HomePage() {
  const [stats] = React.useState({
    throughput: 2.17,
    cacheHitRate: 85,
    latencyReduction: 60,
    agentSupport: 1000
  });

  const [features] = React.useState([
    {
      title: 'ATSLP Algorithm',
      description: 'Adaptive Task Scheduling & Load Prediction with 2.17x throughput improvement',
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      color: 'primary.main',
      gradient: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
      metrics: ['2.17x Throughput', 'Real-time Optimization', 'Load Balancing']
    },
    {
      title: 'HCMPL Algorithm',
      description: 'Hierarchical Cache Management & Pattern Learning with 85%+ cache hit rate',
      icon: <ScienceIcon sx={{ fontSize: 40 }} />,
      color: 'secondary.main',
      gradient: 'linear-gradient(135deg, #E65100 0%, #FF9800 100%)',
      metrics: ['85%+ Cache Hit', 'Pattern Recognition', 'Memory Optimization']
    },
    {
      title: 'CALK Algorithm',
      description: 'Collaborative Agent Learning & Knowledge Transfer with 40-60% latency reduction',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: 'success.main',
      gradient: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      metrics: ['60% Latency Cut', 'Knowledge Sharing', 'Continuous Learning']
    }
  ]);

  return (
    <Box>
      {/* Hero Section with Glassmorphism */}
      <Box sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 30%, #42A5F5 70%, #90CAF9 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        mb: 8,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3Ccircle cx="27" cy="7" r="1"/%3E%3Ccircle cx="47" cy="7" r="1"/%3E%3Ccircle cx="7" cy="27" r="1"/%3E%3Ccircle cx="27" cy="27" r="1"/%3E%3Ccircle cx="47" cy="27" r="1"/%3E%3Ccircle cx="7" cy="47" r="1"/%3E%3Ccircle cx="27" cy="47" r="1"/%3E%3Ccircle cx="47" cy="47" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          animation: 'float 20s infinite linear'
        },
        '@keyframes float': {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-60px)' }
        }
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography variant="h1" component="h1" gutterBottom sx={{
                background: 'linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                mb: 3
              }}>
                Multi-Agent DSL Framework
              </Typography>
              <Typography variant="h4" component="h2" sx={{
                opacity: 0.95,
                mb: 4,
                fontWeight: 400,
                maxWidth: '800px',
                mx: 'auto'
              }}>
                Enterprise-Grade Adaptive Scheduling & Collaborative Learning Solution
              </Typography>
              <Typography variant="h6" sx={{
                opacity: 0.8,
                mb: 6,
                maxWidth: '900px',
                mx: 'auto',
                lineHeight: 1.6
              }}>
                Revolutionizing multi-agent systems with cutting-edge algorithms for optimal performance,
                intelligent caching, and collaborative learning capabilities.
              </Typography>

              {/* CTA Buttons */}
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ScienceIcon />}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.25)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 30px rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  Explore Technology
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<DashboardIcon />}
                  sx={{
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Live Dashboard
                </Button>
              </Box>
            </Box>
          </Fade>

          {/* Stats Section */}
          <Fade in={true} timeout={1500}>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.throughput}x
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Throughput Boost
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.cacheHitRate}%
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Cache Hit Rate
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.latencyReduction}%
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Latency Reduction
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ fontWeight: 700, mb: 1 }}>
                    {stats.agentSupport.toLocaleString()}+
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Agents Supported
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        </Container>
      </Box>

      {/* Core Algorithms Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{
            color: 'primary.main',
            fontWeight: 600
          }}>
            Core Technologies
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Three revolutionary algorithms working in harmony to deliver unprecedented performance
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Zoom in={true} timeout={800 + index * 200}>
                <Card sx={{
                  height: '100%',
                  position: 'relative',
                  background: feature.gradient,
                  color: 'white',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    animation: 'ripple 4s infinite'
                  },
                  '@keyframes ripple': {
                    '0%': { transform: 'scale(0.8) rotate(0deg)' },
                    '50%': { transform: 'scale(1.2) rotate(180deg)' },
                    '100%': { transform: 'scale(0.8) rotate(360deg)' }
                  }
                }}>
                  <CardContent sx={{ p: 4, position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{
                        p: 2,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.2)',
                        mr: 2
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                    </Box>

                    <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {feature.metrics.map((metric, metricIndex) => (
                        <Chip
                          key={metricIndex}
                          label={metric}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            borderRadius: 2,
                            fontWeight: 500,
                            width: 'fit-content'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Performance Metrics Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom sx={{
              color: 'primary.main',
              fontWeight: 600
            }}>
              Proven Performance
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Benchmark results demonstrating superior efficiency across all metrics
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                  System Throughput
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={85}
                    size={120}
                    thickness={6}
                    sx={{ color: 'primary.main' }}
                  />
                  <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography variant="h5" component="div" color="primary" sx={{ fontWeight: 600 }}>
                      217%
                    </Typography>
                  </Box>
                </Box>
                <Typography color="text.secondary">
                  vs. Traditional Multi-Agent Frameworks
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" color="secondary" gutterBottom sx={{ fontWeight: 700 }}>
                  Resource Efficiency
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                  <CircularProgress
                    variant="determinate"
                    value={92}
                    size={120}
                    thickness={6}
                    sx={{ color: 'secondary.main' }}
                  />
                  <Box sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Typography variant="h5" component="div" color="secondary" sx={{ fontWeight: 600 }}>
                      92%
                    </Typography>
                  </Box>
                </Box>
                <Typography color="text.secondary">
                  Optimal Resource Utilization Rate
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
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
  const [knowledgeGraph] = React.useState({
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

// 情感分析工具类
class SentimentAnalyzer {
  constructor() {
    this.positiveWords = ['好', '棒', '优秀', '满意', '喜欢', '爱', '开心', '高兴', '成功', '完美', '赞', '厉害', '强大', '智能', '高效'];
    this.negativeWords = ['坏', '差', '糟糕', '不满', '讨厌', '恨', '难过', '伤心', '失败', '错误', '问题', '困难', '慢', '卡', '崩溃'];
    this.neutralWords = ['一般', '还行', '普通', '正常', '可以', '还行', '中等', '标准'];
  }

  analyze(text) {
    if (!text || typeof text !== 'string') {
      return { sentiment: 'neutral', score: 0, confidence: 0 };
    }

    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    words.forEach(word => {
      if (this.positiveWords.some(pw => word.includes(pw))) {
        positiveCount++;
      } else if (this.negativeWords.some(nw => word.includes(nw))) {
        negativeCount++;
      } else if (this.neutralWords.some(nw => word.includes(nw))) {
        neutralCount++;
      }
    });

    const total = positiveCount + negativeCount + neutralCount;
    if (total === 0) {
      return { sentiment: 'neutral', score: 0, confidence: 0 };
    }

    const positiveScore = positiveCount / total;
    const negativeScore = negativeCount / total;
    const neutralScore = neutralCount / total;

    let sentiment = 'neutral';
    let score = 0;
    let confidence = Math.max(positiveScore, negativeScore, neutralScore);

    if (positiveScore > negativeScore && positiveScore > neutralScore) {
      sentiment = 'positive';
      score = positiveScore;
    } else if (negativeScore > positiveScore && negativeScore > neutralScore) {
      sentiment = 'negative';
      score = negativeScore;
    } else {
      sentiment = 'neutral';
      score = neutralScore;
    }

    return { sentiment, score, confidence };
  }

  getEmoji(sentiment) {
    const emojiMap = {
      positive: '😊',
      negative: '😞',
      neutral: '😐'
    };
    return emojiMap[sentiment] || '😐';
  }

  getColor(sentiment) {
    const colorMap = {
      positive: '#4caf50',
      negative: '#f44336',
      neutral: '#ff9800'
    };
    return colorMap[sentiment] || '#ff9800';
  }
}

// 语音识别工具类
class SpeechRecognitionManager {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.onResult = null;
    this.onError = null;
    this.init();
  }

  init() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'zh-CN';

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        if (this.onResult) {
          this.onResult(result);
        }
      };

      this.recognition.onerror = (event) => {
        if (this.onError) {
          this.onError(event.error);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      this.isListening = true;
      this.recognition.start();
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  isSupported() {
    return this.recognition !== null;
  }
}

// 语音合成工具类
class SpeechSynthesisManager {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.loadVoices();
  }

  loadVoices() {
    this.voices = this.synth.getVoices();
    if (this.voices.length === 0) {
      setTimeout(() => this.loadVoices(), 100);
    }
  }

  speak(text, options = {}) {
    if (!this.synth) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'zh-CN';
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    // 尝试选择中文语音
    const chineseVoice = this.voices.find(voice => 
      voice.lang.includes('zh') || voice.name.includes('Chinese')
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

// 企业级多模态交互页面
function MultimodalPage() {
  const [inputMode, setInputMode] = React.useState('text'); // text, voice, image
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      type: 'agent',
      content: 'Welcome to the Enterprise Multi-Modal AI Assistant! I support text, voice, and image interactions with advanced sentiment analysis and real-time processing capabilities. How can I help you today?',
      timestamp: new Date().toLocaleTimeString(),
      sentiment: { sentiment: 'positive', score: 0.9, confidence: 0.95 },
      mediaType: 'text',
      avatar: '🤖'
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isListening, setIsListening] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [uploadedImage, setUploadedImage] = React.useState(null);
  const [voiceTranscript, setVoiceTranscript] = React.useState('');
  const [isRecording, setIsRecording] = React.useState(false);
  const [audioLevel, setAudioLevel] = React.useState(0);
  const [conversationStats, setConversationStats] = React.useState({
    totalMessages: 1,
    avgSentiment: 0.9,
    responseTime: 0,
    accuracy: 98.5
  });

  const sentimentAnalyzer = React.useRef(new SentimentAnalyzer());
  const speechRecognition = React.useRef(new SpeechRecognitionManager());
  const speechSynthesis = React.useRef(new SpeechSynthesisManager());

  React.useEffect(() => {
    // 设置语音识别回调
    speechRecognition.current.onResult = (result) => {
      setInputText(result);
      setIsListening(false);
    };

    speechRecognition.current.onError = (error) => {
      console.error('语音识别错误:', error);
      setIsListening(false);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim() && !uploadedImage) return;

    const startTime = Date.now();
    const sentiment = sentimentAnalyzer.current.analyze(inputText);

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputText || 'Uploaded an image for analysis',
      timestamp: new Date().toLocaleTimeString(),
      sentiment: sentiment,
      mediaType: uploadedImage ? 'image' : inputMode === 'voice' ? 'voice' : 'text',
      avatar: '👤',
      imageData: uploadedImage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setUploadedImage(null);
    setVoiceTranscript('');
    setIsProcessing(true);

    // 更新统计信息
    setConversationStats(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1
    }));

    // 智能AI处理
    setTimeout(() => {
      const responses = [
        {
          text: 'Based on my multi-modal analysis, I recommend implementing the ATSLP algorithm for adaptive task scheduling. This will provide a 2.17x performance improvement for your multi-agent system.',
          sentiment: 'positive',
          avatar: '🧠'
        },
        {
          text: 'I\'ve analyzed your input using advanced sentiment analysis and computer vision. The HCMPL algorithm would be optimal for your cache management needs, achieving 85%+ hit rates.',
          sentiment: 'positive',
          avatar: '⚡'
        },
        {
          text: 'Through collaborative learning analysis, I suggest integrating CALK algorithms to reduce latency by 40-60%. This will significantly enhance your system\'s responsiveness.',
          sentiment: 'positive',
          avatar: '🎯'
        },
        {
          text: 'Your multi-modal input has been processed successfully. I recommend a hybrid approach combining all three core algorithms (ATSLP, HCMPL, CALK) for maximum efficiency.',
          sentiment: 'positive',
          avatar: '🚀'
        }
      ];

      const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
      const processingTime = Date.now() - startTime;

      const aiMessage = {
        id: Date.now() + 1,
        type: 'agent',
        content: selectedResponse.text,
        timestamp: new Date().toLocaleTimeString(),
        sentiment: { sentiment: selectedResponse.sentiment, score: 0.85, confidence: 0.9 },
        mediaType: 'text',
        avatar: selectedResponse.avatar,
        processingTime: processingTime
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);

      // 更新统计信息
      setConversationStats(prev => ({
        ...prev,
        responseTime: processingTime,
        accuracy: Math.min(99.9, prev.accuracy + Math.random() * 0.5),
        avgSentiment: (prev.avgSentiment + sentiment.score) / 2
      }));

      // 语音播报回复
      if (inputMode === 'voice' || Math.random() > 0.5) {
        speechSynthesis.current.speak(selectedResponse.text);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      speechRecognition.current.stopListening();
      setIsListening(false);
      setIsRecording(false);
    } else {
      speechRecognition.current.startListening();
      setIsListening(true);
      setIsRecording(true);
      setInputMode('voice');

      // 模拟音频级别
      const audioInterval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);

      setTimeout(() => {
        clearInterval(audioInterval);
        setAudioLevel(0);
      }, 5000);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // 检查文件大小 (限制为5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setInputMode('image');
        setInputText(`Analyzing uploaded image: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const clearCurrentInput = () => {
    setInputText('');
    setUploadedImage(null);
    setVoiceTranscript('');
    setInputMode('text');
  };

  const renderMessage = (message) => {
    const sentiment = message.sentiment || sentimentAnalyzer.current.analyze(message.content);
    const isUser = message.type === 'user';

    return (
      <Fade in={true} timeout={500} key={message.id}>
        <Box sx={{
          mb: 3,
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          alignItems: 'flex-start'
        }}>
          {/* AI Avatar */}
          {!isUser && (
            <Avatar sx={{
              mr: 2,
              bgcolor: 'primary.main',
              width: 40,
              height: 40,
              fontSize: '1.2rem'
            }}>
              {message.avatar || '🤖'}
            </Avatar>
          )}

          <Card sx={{
            maxWidth: '75%',
            background: isUser
              ? 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            color: isUser ? 'white' : 'text.primary',
            position: 'relative',
            border: !isUser ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
            '&::before': !isUser ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(13, 71, 161, 0.3), transparent)'
            } : {}
          }}>
            <CardContent sx={{ p: 2 }}>
              {/* Message Header */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="caption" sx={{
                  fontWeight: 600,
                  color: isUser ? 'rgba(255,255,255,0.8)' : 'primary.main'
                }}>
                  {isUser ? 'You' : 'AI Assistant'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {/* Media Type Indicator */}
                  <Chip
                    label={message.mediaType}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: '0.7rem',
                      bgcolor: isUser ? 'rgba(255,255,255,0.2)' : 'primary.light',
                      color: isUser ? 'white' : 'white'
                    }}
                  />
                  {/* Processing Time */}
                  {message.processingTime && (
                    <Typography variant="caption" sx={{
                      fontSize: '0.65rem',
                      opacity: 0.7
                    }}>
                      {message.processingTime}ms
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* Image Content */}
              {message.mediaType === 'image' && message.imageData && (
                <Box sx={{ mb: 2, position: 'relative' }}>
                  <img
                    src={message.imageData}
                    alt="Uploaded content"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                    }}
                  />
                  <Chip
                    label="Image Analysis"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      color: 'white'
                    }}
                  />
                </Box>
              )}

              {/* Voice Indicator */}
              {message.mediaType === 'voice' && (
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MicIcon sx={{ fontSize: 16, color: isUser ? 'rgba(255,255,255,0.8)' : 'primary.main' }} />
                  <Typography variant="caption" sx={{
                    fontSize: '0.7rem',
                    opacity: 0.8
                  }}>
                    Voice Message Transcribed
                  </Typography>
                </Box>
              )}

              {/* Message Content */}
              <Typography variant="body1" sx={{
                lineHeight: 1.6,
                mb: 2
              }}>
                {message.content}
              </Typography>

              {/* Message Footer */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="caption" sx={{
                  opacity: 0.7,
                  fontSize: '0.7rem'
                }}>
                  {message.timestamp}
                </Typography>

                {/* Sentiment Analysis */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ fontSize: '1rem' }}>
                    {sentimentAnalyzer.current.getEmoji(sentiment.sentiment)}
                  </Typography>
                  <Chip
                    label={`${sentiment.sentiment} ${Math.round((sentiment.score || 0) * 100)}%`}
                    size="small"
                    sx={{
                      bgcolor: sentimentAnalyzer.current.getColor(sentiment.sentiment),
                      color: 'white',
                      fontSize: '0.65rem',
                      height: '18px'
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* User Avatar */}
          {isUser && (
            <Avatar sx={{
              ml: 2,
              bgcolor: 'secondary.main',
              width: 40,
              height: 40,
              fontSize: '1.2rem'
            }}>
              {message.avatar || '👤'}
            </Avatar>
          )}
        </Box>
      </Fade>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          多模态智能交互
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          支持文字、语音、图像多种交互方式，集成情感分析功能
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 对话区域 */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {messages.map(renderMessage)}
              {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                  <Card sx={{ bgcolor: 'grey.100' }}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Typography variant="body2">AI正在分析中...</Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
                        <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite' }} />
                        <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }} />
                        <Box sx={{ width: 4, height: 4, bgcolor: 'primary.main', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </CardContent>
            
            {/* 输入区域 */}
            <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
              {/* 模式选择 */}
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip 
                  label="文字" 
                  icon={<ChatIcon />}
                  color={inputMode === 'text' ? 'primary' : 'default'}
                  onClick={() => setInputMode('text')}
                />
                <Chip 
                  label="语音" 
                  icon={<MicIcon />}
                  color={inputMode === 'voice' ? 'primary' : 'default'}
                  onClick={() => setInputMode('voice')}
                  disabled={!speechRecognition.current.isSupported()}
                />
                <Chip 
                  label="图像" 
                  icon={<ImageIcon />}
                  color={inputMode === 'image' ? 'primary' : 'default'}
                  onClick={() => setInputMode('image')}
                />
              </Box>

              {/* 输入控件 */}
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                {inputMode === 'text' && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="输入您的问题..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                )}
                
                {inputMode === 'voice' && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={isListening ? "正在听取语音..." : "点击麦克风开始语音输入"}
                    value={inputText}
                    disabled
                  />
                )}

                {inputMode === 'image' && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="选择图片文件..."
                    disabled
                  />
                )}

                {/* 功能按钮 */}
                <IconButton 
                  color={isListening ? 'error' : 'primary'}
                  onClick={handleVoiceInput}
                  disabled={!speechRecognition.current.isSupported()}
                >
                  {isListening ? <MicOffIcon /> : <MicIcon />}
                </IconButton>

                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="image-upload">
                  <IconButton color="primary" component="span">
                    <AttachFileIcon />
                  </IconButton>
                </label>

                <Button 
                  variant="contained" 
                  onClick={handleSendMessage} 
                  disabled={!inputText.trim() && !uploadedImage}
                >
                  发送
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* 企业级侧边栏 - 实时分析 */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '700px' }}>
            {/* 实时统计 */}
            <Card sx={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main',
                  fontWeight: 600
                }}>
                  <DashboardIcon />
                  Real-time Analytics
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                        {conversationStats.totalMessages}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Total Messages
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                        {conversationStats.responseTime}ms
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Avg Response
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="success" sx={{ fontWeight: 700 }}>
                        {conversationStats.accuracy.toFixed(1)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Accuracy
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', position: 'relative' }}>
                      <CircularProgress
                        variant="determinate"
                        value={conversationStats.avgSentiment * 100}
                        size={40}
                        thickness={6}
                        sx={{ color: 'warning.main' }}
                      />
                      <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                      }}>
                        <Typography variant="caption" sx={{ fontSize: '0.6rem', fontWeight: 600 }}>
                          {Math.round(conversationStats.avgSentiment * 100)}%
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Sentiment
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* 语音级别显示 */}
            {isRecording && (
              <Card sx={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'secondary.main'
                  }}>
                    <MicIcon />
                    Voice Input Active
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={audioLevel}
                      sx={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 152, 0, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#ff9800'
                        }
                      }}
                    />
                    <Typography variant="body2" sx={{ minWidth: 35 }}>
                      {Math.round(audioLevel)}%
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Listening for voice input...
                  </Typography>
                </CardContent>
              </Card>
            )}

            {/* 情感分析面板 */}
            <Card sx={{ flex: 1, overflow: 'hidden' }}>
              <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: 'primary.main'
                }}>
                  <SentimentIcon />
                  Sentiment Analysis
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Overall Sentiment Trend</Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={`Positive (${messages.filter(m => m.sentiment?.sentiment === 'positive').length})`}
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Neutral (${messages.filter(m => m.sentiment?.sentiment === 'neutral').length})`}
                      color="warning"
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={`Negative (${messages.filter(m => m.sentiment?.sentiment === 'negative').length})`}
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>

                <Typography variant="subtitle2" gutterBottom>Recent Message Analysis</Typography>
                <Box sx={{ flex: 1, overflow: 'auto' }}>
                  <List dense>
                    {messages.slice(-6).reverse().map((msg) => {
                      const sentiment = msg.sentiment || sentimentAnalyzer.current.analyze(msg.content);
                      return (
                        <ListItem key={msg.id} sx={{ px: 0, py: 0.5 }}>
                          <Avatar sx={{
                            mr: 1,
                            width: 24,
                            height: 24,
                            fontSize: '0.8rem',
                            bgcolor: msg.type === 'user' ? 'secondary.main' : 'primary.main'
                          }}>
                            {msg.avatar || (msg.type === 'user' ? '👤' : '🤖')}
                          </Avatar>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography variant="body2" sx={{
                                  fontSize: '0.8rem',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  maxWidth: '150px'
                                }}>
                                  {msg.content.substring(0, 25)}...
                                </Typography>
                                <Chip
                                  label={sentimentAnalyzer.current.getEmoji(sentiment.sentiment)}
                                  size="small"
                                  sx={{
                                    height: 16,
                                    fontSize: '0.6rem',
                                    bgcolor: sentimentAnalyzer.current.getColor(sentiment.sentiment),
                                    color: 'white'
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                                {msg.timestamp} • {sentiment.sentiment} ({Math.round((sentiment.score || 0) * 100)}%)
                              </Typography>
                            }
                          />
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Typography variant="subtitle2" gutterBottom>Multi-Modal Stats</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary">
                        {messages.filter(m => m.mediaType === 'text').length}
                      </Typography>
                      <Typography variant="caption">Text</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="secondary">
                        {messages.filter(m => m.mediaType === 'voice').length}
                      </Typography>
                      <Typography variant="caption">Voice</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="success">
                        {messages.filter(m => m.mediaType === 'image').length}
                      </Typography>
                      <Typography variant="caption">Image</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

// 企业级知识图谱可视化页面
function KnowledgeGraphPage() {
  const [graphData, setGraphData] = React.useState({
    nodes: [
      { id: 'dsl', label: 'Multi-Agent DSL Framework', group: 'core', x: 0, y: 0, size: 35, description: 'Core framework for multi-agent systems', status: 'active' },
      { id: 'atslp', label: 'ATSLP Algorithm', group: 'algorithm', x: -200, y: -120, size: 28, description: 'Adaptive Task Scheduling & Load Prediction', status: 'active' },
      { id: 'hcmpl', label: 'HCMPL Algorithm', group: 'algorithm', x: 200, y: -120, size: 28, description: 'Hierarchical Cache Management & Pattern Learning', status: 'active' },
      { id: 'calk', label: 'CALK Algorithm', group: 'algorithm', x: 0, y: -240, size: 28, description: 'Collaborative Agent Learning & Knowledge Transfer', status: 'active' },
      { id: 'weather', label: 'Weather Agent', group: 'agent', x: -300, y: 120, size: 22, description: 'Weather prediction and monitoring agent', status: 'active' },
      { id: 'traffic', label: 'Traffic Agent', group: 'agent', x: -150, y: 120, size: 22, description: 'Traffic optimization and management agent', status: 'active' },
      { id: 'parking', label: 'Parking Agent', group: 'agent', x: 0, y: 120, size: 22, description: 'Parking space management agent', status: 'active' },
      { id: 'safety', label: 'Safety Agent', group: 'agent', x: 150, y: 120, size: 22, description: 'Safety monitoring and alert agent', status: 'warning' },
      { id: 'ems', label: 'EMS Agent', group: 'agent', x: 300, y: 120, size: 22, description: 'Emergency medical services agent', status: 'active' },
      { id: 'scheduler', label: 'Task Scheduler', group: 'system', x: -200, y: 240, size: 25, description: 'Centralized task scheduling system', status: 'active' },
      { id: 'cache', label: 'Cache System', group: 'system', x: 0, y: 240, size: 25, description: 'Intelligent caching management system', status: 'active' },
      { id: 'learning', label: 'Learning Module', group: 'system', x: 200, y: 240, size: 25, description: 'Collaborative learning and knowledge sharing', status: 'active' },
      { id: 'performance', label: 'Performance Monitor', group: 'monitor', x: -100, y: 360, size: 20, description: 'Real-time performance monitoring', status: 'active' },
      { id: 'analytics', label: 'Analytics Engine', group: 'monitor', x: 100, y: 360, size: 20, description: 'Advanced data analytics and insights', status: 'active' }
    ],
    links: [
      { source: 'dsl', target: 'atslp', weight: 0.9, label: 'Core Algorithm', type: 'primary' },
      { source: 'dsl', target: 'hcmpl', weight: 0.9, label: 'Core Algorithm', type: 'primary' },
      { source: 'dsl', target: 'calk', weight: 0.9, label: 'Core Algorithm', type: 'primary' },
      { source: 'atslp', target: 'scheduler', weight: 0.7, label: 'Scheduling Optimization', type: 'secondary' },
      { source: 'hcmpl', target: 'cache', weight: 0.7, label: 'Cache Optimization', type: 'secondary' },
      { source: 'calk', target: 'learning', weight: 0.7, label: 'Learning Optimization', type: 'secondary' },
      { source: 'scheduler', target: 'weather', weight: 0.5, label: 'Task Assignment', type: 'tertiary' },
      { source: 'scheduler', target: 'traffic', weight: 0.5, label: 'Task Assignment', type: 'tertiary' },
      { source: 'scheduler', target: 'parking', weight: 0.5, label: 'Task Assignment', type: 'tertiary' },
      { source: 'scheduler', target: 'safety', weight: 0.5, label: 'Task Assignment', type: 'tertiary' },
      { source: 'scheduler', target: 'ems', weight: 0.5, label: 'Task Assignment', type: 'tertiary' },
      { source: 'cache', target: 'weather', weight: 0.4, label: 'Data Caching', type: 'tertiary' },
      { source: 'cache', target: 'traffic', weight: 0.4, label: 'Data Caching', type: 'tertiary' },
      { source: 'cache', target: 'parking', weight: 0.4, label: 'Data Caching', type: 'tertiary' },
      { source: 'learning', target: 'weather', weight: 0.6, label: 'Knowledge Sharing', type: 'secondary' },
      { source: 'learning', target: 'traffic', weight: 0.6, label: 'Knowledge Sharing', type: 'secondary' },
      { source: 'learning', target: 'parking', weight: 0.6, label: 'Knowledge Sharing', type: 'secondary' },
      { source: 'scheduler', target: 'performance', weight: 0.3, label: 'Performance Monitoring', type: 'quaternary' },
      { source: 'learning', target: 'analytics', weight: 0.3, label: 'Data Analysis', type: 'quaternary' }
    ]
  });

  const [selectedNode, setSelectedNode] = React.useState(null);
  const [animationEnabled, setAnimationEnabled] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterGroup, setFilterGroup] = React.useState('all');
  const [filteredData, setFilteredData] = React.useState(graphData);

  const nodeColors = {
    core: '#1976d2',
    algorithm: '#dc004e',
    agent: '#4caf50',
    system: '#ff9800',
    monitor: '#9c27b0'
  };

  const nodeGroups = {
    core: 'Core Framework',
    algorithm: 'Core Algorithms',
    agent: 'Intelligent Agents',
    system: 'System Components',
    monitor: 'Monitoring & Analytics'
  };

  // 搜索和过滤效果
  React.useEffect(() => {
    let filtered = { nodes: [...graphData.nodes], links: [...graphData.links] };

    // 搜索过滤
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered.nodes = filtered.nodes.filter(node =>
        node.label.toLowerCase().includes(searchLower) ||
        node.description.toLowerCase().includes(searchLower)
      );

      const nodeIds = new Set(filtered.nodes.map(n => n.id));
      filtered.links = filtered.links.filter(link =>
        nodeIds.has(link.source) && nodeIds.has(link.target)
      );
    }

    // 分组过滤
    if (filterGroup !== 'all') {
      filtered.nodes = filtered.nodes.filter(node => node.group === filterGroup);

      const nodeIds = new Set(filtered.nodes.map(n => n.id));
      filtered.links = filtered.links.filter(link =>
        nodeIds.has(link.source) && nodeIds.has(link.target)
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, filterGroup, graphData]);

  // 动画效果
  React.useEffect(() => {
    if (animationEnabled) {
      const interval = setInterval(() => {
        setGraphData(prevData => ({
          ...prevData,
          nodes: prevData.nodes.map(node => ({
            ...node,
            x: node.x + (Math.random() - 0.5) * 5,
            y: node.y + (Math.random() - 0.5) * 5
          }))
        }));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [animationEnabled]);

  const handleNodeClick = (nodeId) => {
    const node = graphData.nodes.find(n => n.id === nodeId);
    setSelectedNode(node);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterGroup(event.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterGroup('all');
    setSelectedNode(null);
  };

  const renderGraph = () => (
    <Box sx={{
      height: '800px',
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, 0.08)',
      borderRadius: 3,
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 20%, rgba(13, 71, 161, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(230, 81, 0, 0.1) 0%, transparent 50%)',
        zIndex: 1
      }
    }}>
      <svg width="100%" height="100%" style={{ position: 'relative', zIndex: 2 }}>
        <defs>
          {/* 渐变定义 */}
          <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0D47A1" />
            <stop offset="100%" stopColor="#1976D2" />
          </linearGradient>
          <linearGradient id="algorithmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#FF9800" />
          </linearGradient>
          <linearGradient id="agentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
          <linearGradient id="systemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F57F17" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>
          <linearGradient id="monitorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6A1B9A" />
            <stop offset="100%" stopColor="#9C27B0" />
          </linearGradient>

          {/* 发光滤镜 */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* 阴影滤镜 */}
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3"/>
          </filter>

          {/* 箭头标记 */}
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill={nodeColors.core} opacity="0.6" />
          </marker>
        </defs>

        {/* 背景网格 */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />

        {/* 绘制连接线 */}
        {filteredData.links.map((link, index) => {
          const source = graphData.nodes.find(n => n.id === link.source);
          const target = graphData.nodes.find(n => n.id === link.target);
          if (!source || !target) return null;

          const x1 = 400 + source.x;
          const y1 = 400 + source.y;
          const x2 = 400 + target.x;
          const y2 = 400 + target.y;

          // 计算控制点以创建曲线
          const dx = x2 - x1;
          const dy = y2 - y1;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const controlOffset = distance * 0.2;
          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;
          const controlX = midX + (-dy / distance) * controlOffset;
          const controlY = midY + (dx / distance) * controlOffset;

          const isHighlighted = selectedNode && (selectedNode.id === link.source || selectedNode.id === link.target);

          return (
            <g key={index}>
              {/* 连接线背景 */}
              <path
                d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`}
                stroke="rgba(255,255,255,0.8)"
                strokeWidth={link.weight * 6 + 2}
                fill="none"
                opacity={isHighlighted ? 0.9 : 0.3}
              />
              {/* 主连接线 */}
              <path
                d={`M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`}
                stroke={nodeColors[source.group]}
                strokeWidth={link.weight * 5}
                fill="none"
                opacity={isHighlighted ? 1 : 0.6}
                strokeDasharray={link.weight > 0.7 ? "0" : "8,4"}
                markerEnd="url(#arrowhead)"
                style={{
                  filter: isHighlighted ? 'url(#glow)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="0;20"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>

              {/* 连接标签背景 */}
              <circle
                cx={controlX}
                cy={controlY}
                r="20"
                fill="rgba(255, 255, 255, 0.9)"
                stroke={nodeColors[source.group]}
                strokeWidth="2"
                opacity={isHighlighted ? 0.9 : 0.6}
                style={{ filter: 'url(#shadow)' }}
              />

              {/* 连接标签 */}
              <text
                x={controlX}
                y={controlY + 2}
                textAnchor="middle"
                fill={nodeColors[source.group]}
                fontSize="10"
                fontWeight="bold"
                opacity={isHighlighted ? 1 : 0.7}
                style={{ pointerEvents: 'none' }}
              >
                {link.label}
              </text>
            </g>
          );
        })}

        {/* 绘制节点 */}
        {filteredData.nodes.map((node, index) => {
          const x = 400 + node.x;
          const y = 400 + node.y;
          const color = nodeColors[node.group];
          const isSelected = selectedNode && selectedNode.id === node.id;
          const gradientId = `${node.group}Gradient`;

          return (
            <g key={node.id}>
              {/* 选中状态的外圈动画 */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r={node.size + 15}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  opacity="0.4"
                  strokeDasharray="10,5"
                >
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="rotate"
                    from={`0 ${x} ${y}`}
                    to={`360 ${x} ${y}`}
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* 节点光晕 */}
              <circle
                cx={x}
                cy={y}
                r={node.size + 8}
                fill={color}
                opacity="0.2"
                style={{ filter: 'url(#glow)' }}
              />

              {/* 节点阴影 */}
              <circle
                cx={x + 3}
                cy={y + 3}
                r={node.size}
                fill="rgba(0,0,0,0.15)"
                style={{ pointerEvents: 'none' }}
              />

              {/* 节点主体 */}
              <circle
                cx={x}
                cy={y}
                r={node.size}
                fill={`url(#${gradientId})`}
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth={isSelected ? 4 : 3}
                style={{
                  cursor: 'pointer',
                  filter: 'url(#shadow)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                  e.target.style.transformOrigin = `${x}px ${y}px`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />

              {/* 节点图标背景 */}
              <circle
                cx={x}
                cy={y - 5}
                r={node.size * 0.4}
                fill="rgba(255, 255, 255, 0.9)"
                style={{ pointerEvents: 'none' }}
              />

              {/* 节点标签背景 */}
              <rect
                x={x - 35}
                y={y + node.size + 5}
                width="70"
                height="20"
                rx="10"
                fill="rgba(255, 255, 255, 0.9)"
                stroke={color}
                strokeWidth="1"
                style={{ pointerEvents: 'none' }}
              />

              {/* 节点标签 */}
              <text
                x={x}
                y={y + node.size + 17}
                textAnchor="middle"
                fill={color}
                fontSize="11"
                fontWeight="600"
                style={{ pointerEvents: 'none' }}
              >
                {node.label.split(' ')[0]}
              </text>

              {/* 节点副标签 */}
              {node.label.split(' ').length > 1 && (
                <text
                  x={x}
                  y={y + node.size + 30}
                  textAnchor="middle"
                  fill={color}
                  fontSize="9"
                  fontWeight="400"
                  opacity="0.8"
                  style={{ pointerEvents: 'none' }}
                >
                  {node.label.split(' ').slice(1).join(' ')}
                </text>
              )}

              {/* 节点脉冲动画 */}
              {animationEnabled && (
                <circle
                  cx={x}
                  cy={y}
                  r={node.size}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  opacity="0"
                >
                  <animate
                    attributeName="r"
                    values={`${node.size};${node.size + 20};${node.size}`}
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;0;0.8"
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>
      
      {/* 图例 */}
      <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'white', p: 2, borderRadius: 1, boxShadow: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Legend</Typography>
        {Object.entries(nodeGroups).map(([key, label]) => (
          <Box key={key} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: nodeColors[key], borderRadius: '50%', mr: 1 }} />
            <Typography variant="caption">{label}</Typography>
          </Box>
        ))}
      </Box>

      {/* 企业级控制面板 */}
      <Box sx={{
        position: 'absolute',
        top: 15,
        left: 15,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        p: 3,
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(20px)',
        minWidth: '280px'
      }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
          Graph Controls
        </Typography>

        {/* 搜索框 */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search nodes..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 1, color: 'text.secondary' }}>
                🔍
              </Box>
            )
          }}
        />

        {/* 分组过滤 */}
        <FormControlLabel
          control={
            <TextField
              select
              size="small"
              value={filterGroup}
              onChange={handleFilterChange}
              sx={{ minWidth: 120 }}
            >
              <option value="all">All Groups</option>
              {Object.entries(nodeGroups).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </TextField>
          }
          label=""
          sx={{ mb: 1, width: '100%' }}
        />

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Filter by Component Type
        </Typography>

        {/* 动画控制 */}
        <FormControlLabel
          control={
            <Switch
              checked={animationEnabled}
              onChange={(e) => setAnimationEnabled(e.target.checked)}
              size="small"
              color="primary"
            />
          }
          label="Live Animation"
          sx={{ mb: 2 }}
        />

        {/* 清除过滤器 */}
        <Button
          fullWidth
          variant="outlined"
          size="small"
          onClick={clearFilters}
          sx={{ mb: 2 }}
        >
          Clear Filters
        </Button>

        {/* 统计信息 */}
        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Visible Elements
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="primary">
              Nodes: {filteredData.nodes.length}
            </Typography>
            <Typography variant="body2" color="secondary">
              Links: {filteredData.links.length}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Knowledge Graph Visualization
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Multi-Agent DSL Framework: Knowledge Association and Collaborative Relationship Graph
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          This visualization demonstrates the architectural relationships between core algorithms (ATSLP, HCMPL, CALK), 
          intelligent agents, and system components in our multi-agent DSL framework.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 图谱可视化 */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {renderGraph()}
            </CardContent>
          </Card>
        </Grid>

        {/* 节点详情 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '700px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Node Details
              </Typography>
              
              {selectedNode ? (
                <Box>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {selectedNode.label}
                  </Typography>
                  <Chip 
                    label={nodeGroups[selectedNode.group]} 
                    color="primary" 
                    size="small" 
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography variant="body2" gutterBottom>
                    <strong>Description:</strong> {selectedNode.description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Node ID:</strong> {selectedNode.id}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Position:</strong> ({Math.round(selectedNode.x)}, {Math.round(selectedNode.y)})
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Size:</strong> {selectedNode.size}px
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>Connections</Typography>
                  <List dense>
                    {graphData.links
                      .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
                      .map((link, index) => {
                        const connectedNodeId = link.source === selectedNode.id ? link.target : link.source;
                        const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
                        return (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemText
                              primary={connectedNode?.label}
                              secondary={`${link.label} (Weight: ${link.weight})`}
                            />
                          </ListItem>
                        );
                      })}
                  </List>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Click on any node in the graph to view detailed information
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 统计信息 */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
            <CardContent>
              <Typography variant="h6" color="primary">Total Nodes</Typography>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                {filteredData.nodes.length} / {graphData.nodes.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">Architecture Components</Typography>
              <LinearProgress
                variant="determinate"
                value={(filteredData.nodes.length / graphData.nodes.length) * 100}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' }}>
            <CardContent>
              <Typography variant="h6" color="secondary">Total Connections</Typography>
              <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                {filteredData.links.length} / {graphData.links.length}
              </Typography>
              <Typography variant="caption" color="text.secondary">Relationship Links</Typography>
              <LinearProgress
                variant="determinate"
                value={(filteredData.links.length / graphData.links.length) * 100}
                color="secondary"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)' }}>
            <CardContent>
              <Typography variant="h6" color="success">Intelligent Agents</Typography>
              <Typography variant="h4" color="success" sx={{ fontWeight: 700 }}>
                {filteredData.nodes.filter(n => n.group === 'agent').length} / {graphData.nodes.filter(n => n.group === 'agent').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">Active Agents</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label="Weather" size="small" color="success" variant="outlined" />
                <Chip label="Traffic" size="small" color="success" variant="outlined" />
                <Chip label="Safety" size="small" color="warning" variant="outlined" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)' }}>
            <CardContent>
              <Typography variant="h6" color="error">Core Algorithms</Typography>
              <Typography variant="h4" color="error" sx={{ fontWeight: 700 }}>
                {filteredData.nodes.filter(n => n.group === 'algorithm').length} / {graphData.nodes.filter(n => n.group === 'algorithm').length}
              </Typography>
              <Typography variant="caption" color="text.secondary">ATSLP, HCMPL, CALK</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip label="ATSLP" size="small" color="primary" />
                <Chip label="HCMPL" size="small" color="secondary" />
                <Chip label="CALK" size="small" color="success" />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// 企业级仪表板页面
function DashboardPage() {
  const [systemMetrics, setSystemMetrics] = React.useState({
    throughput: 217,
    cacheHitRate: 85.4,
    latencyReduction: 58.2,
    activeAgents: 12,
    totalRequests: 156789,
    averageResponseTime: 245,
    errorRate: 0.3,
    uptime: 99.97
  });

  const [performanceData, setPerformanceData] = React.useState([
    { time: '00:00', cpu: 45, memory: 62, network: 35 },
    { time: '04:00', cpu: 52, memory: 58, network: 42 },
    { time: '08:00', cpu: 67, memory: 71, network: 58 },
    { time: '12:00', cpu: 78, memory: 76, network: 64 },
    { time: '16:00', cpu: 71, memory: 68, network: 55 },
    { time: '20:00', cpu: 59, memory: 63, network: 48 },
    { time: '24:00', cpu: 48, memory: 57, network: 38 }
  ]);

  const [agentStatus, setAgentStatus] = React.useState([
    { name: 'ATSLP Scheduler', status: 'active', load: 72, efficiency: 96.2 },
    { name: 'HCMPL Cache Manager', status: 'active', load: 64, efficiency: 94.8 },
    { name: 'CALK Learning Engine', status: 'active', load: 58, efficiency: 97.1 },
    { name: 'Weather Analytics', status: 'active', load: 43, efficiency: 95.5 },
    { name: 'Traffic Optimizer', status: 'warning', load: 89, efficiency: 88.3 },
    { name: 'Safety Monitor', status: 'active', load: 51, efficiency: 93.7 }
  ]);

  const [alerts, setAlerts] = React.useState([
    { id: 1, type: 'warning', message: 'Traffic Optimizer CPU usage above 85%', time: '2 minutes ago', severity: 'medium' },
    { id: 2, type: 'info', message: 'Cache hit rate improved by 3.2%', time: '15 minutes ago', severity: 'low' },
    { id: 3, type: 'success', message: 'System throughput reached new peak', time: '1 hour ago', severity: 'low' }
  ]);

  // 实时数据更新
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        throughput: prev.throughput + (Math.random() - 0.5) * 10,
        cacheHitRate: Math.max(80, Math.min(95, prev.cacheHitRate + (Math.random() - 0.5) * 2)),
        latencyReduction: Math.max(40, Math.min(70, prev.latencyReduction + (Math.random() - 0.5) * 3)),
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 100),
        averageResponseTime: Math.max(100, Math.min(500, prev.averageResponseTime + (Math.random() - 0.5) * 20)),
        errorRate: Math.max(0, Math.min(2, prev.errorRate + (Math.random() - 0.5) * 0.1))
      }));

      // 更新智能体状态
      setAgentStatus(prev => prev.map(agent => ({
        ...agent,
        load: Math.max(20, Math.min(95, agent.load + (Math.random() - 0.5) * 10)),
        efficiency: Math.max(85, Math.min(99, agent.efficiency + (Math.random() - 0.5) * 1))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'error': return '🚨';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 页面标题 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #0D47A1 30%, #1976D2 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Enterprise Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Real-time Multi-Agent System Performance & Analytics
        </Typography>
      </Box>

      {/* 核心指标卡片 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <DashboardIcon sx={{ mr: 1 }} />
                <Typography variant="h6">System Throughput</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {systemMetrics.throughput.toFixed(0)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                vs. Baseline Performance
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(100, (systemMetrics.throughput / 300) * 100)}
                sx={{
                  mt: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'rgba(255,255,255,0.8)'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #E65100 0%, #FF9800 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScienceIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Cache Hit Rate</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {systemMetrics.cacheHitRate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                HCMPL Algorithm Efficiency
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemMetrics.cacheHitRate}
                sx={{
                  mt: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'rgba(255,255,255,0.8)'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Latency Reduction</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {systemMetrics.latencyReduction.toFixed(1)}%
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                CALK Algorithm Impact
              </Typography>
              <LinearProgress
                variant="determinate"
                value={systemMetrics.latencyReduction}
                sx={{
                  mt: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: 'rgba(255,255,255,0.8)'
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            background: 'linear-gradient(135deg, #6A1B9A 0%, #9C27B0 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Active Agents</Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                {systemMetrics.activeAgents}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Concurrent Processing Units
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                {[...Array(systemMetrics.activeAgents)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255,255,255,0.8)',
                      animation: `pulse 2s infinite ${i * 0.2}s`,
                      '@keyframes pulse': {
                        '0%': { opacity: 0.5 },
                        '50%': { opacity: 1 },
                        '100%': { opacity: 0.5 }
                      }
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* 性能监控图表 */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TimelineIcon color="primary" />
                Real-time Performance Monitoring
              </Typography>
              <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" color="text.secondary">
                  📊 Performance Chart Visualization
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 系统告警 */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '400px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ color: 'warning.main' }}>🚨</Box>
                System Alerts
              </Typography>
              <Box sx={{ height: '300px', overflow: 'auto' }}>
                <List dense>
                  {alerts.map((alert) => (
                    <ListItem key={alert.id} sx={{
                      border: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: 2,
                      mb: 1,
                      bgcolor: alert.type === 'warning' ? 'warning.light' :
                                alert.type === 'error' ? 'error.light' :
                                alert.type === 'success' ? 'success.light' : 'info.light',
                      '&:hover': {
                        bgcolor: alert.type + '.main',
                        color: 'white'
                      }
                    }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">
                              {getAlertIcon(alert.type)}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {alert.message}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {alert.time}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 智能体状态监控 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <GroupIcon color="primary" />
                Agent Status Monitor
              </Typography>
              <Grid container spacing={2}>
                {agentStatus.map((agent, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{
                      border: '1px solid rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: 4,
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.2s ease'
                    }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {agent.name}
                          </Typography>
                          <Chip
                            label={agent.status}
                            color={getStatusColor(agent.status)}
                            size="small"
                          />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="text.secondary">Load</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {agent.load}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={agent.load}
                            color={agent.load > 80 ? 'error' : agent.load > 60 ? 'warning' : 'success'}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            Efficiency
                          </Typography>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            {agent.efficiency.toFixed(1)}%
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 详细系统指标 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScienceIcon color="primary" />
                System Metrics Overview
              </Typography>
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                      {systemMetrics.totalRequests.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Requests Processed
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="secondary" sx={{ fontWeight: 700 }}>
                      {systemMetrics.averageResponseTime}ms
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Response Time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="success" sx={{ fontWeight: 700 }}>
                      {systemMetrics.uptime}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      System Uptime
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="error" sx={{ fontWeight: 700 }}>
                      {systemMetrics.errorRate.toFixed(1)}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Error Rate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
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
          <Route path="/multimodal" element={<MultimodalPage />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraphPage />} />
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