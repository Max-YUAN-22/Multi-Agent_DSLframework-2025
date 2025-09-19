import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, Typography, Container, AppBar, Toolbar, Button, Card, CardContent, 
  Grid, Chip, List, ListItem, ListItemText, Avatar, Divider
} from '@mui/material';
import { 
  Science as ScienceIcon, Code as CodeIcon, Group as GroupIcon, 
  History as HistoryIcon, Dashboard as DashboardIcon, Settings as SettingsIcon
} from '@mui/icons-material';

// 企业级主题
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
  },
});

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

// 智能体管理页面
function AgentsPage() {
  const agents = [
    { name: 'Weather Agent', status: 'active', avatar: '🌤️', tasks: 23 },
    { name: 'Traffic Agent', status: 'active', avatar: '🚦', tasks: 45 },
    { name: 'Parking Agent', status: 'active', avatar: '🅿️', tasks: 18 },
    { name: 'Safety Agent', status: 'warning', avatar: '🛡️', tasks: 12 },
    { name: 'EMS Agent', status: 'active', avatar: '🏥', tasks: 8 },
    { name: 'Enforcement Agent', status: 'active', avatar: '🚨', tasks: 15 },
    { name: 'Sanitation Agent', status: 'active', avatar: '🧹', tasks: 22 },
    { name: 'Sprinkler Agent', status: 'active', avatar: '💧', tasks: 6 },
    { name: 'AutoDrive Agent', status: 'active', avatar: '🚗', tasks: 35 },
    { name: 'City Manager Agent', status: 'active', avatar: '🏙️', tasks: 28 },
    { name: 'Perception Agent', status: 'active', avatar: '👁️', tasks: 41 },
    { name: 'Analytics Agent', status: 'active', avatar: '📊', tasks: 19 },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        智能体管理
      </Typography>
      <Grid container spacing={2}>
        {agents.map((agent, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// 交互记录页面
function InteractionsPage() {
  const interactions = [
    { id: 1, agent: 'Weather Agent', action: '天气预警', time: '2025-01-19 23:45:12', status: 'completed' },
    { id: 2, agent: 'Traffic Agent', action: '交通优化', time: '2025-01-19 23:44:30', status: 'completed' },
    { id: 3, agent: 'Parking Agent', action: '停车位分配', time: '2025-01-19 23:43:15', status: 'completed' },
    { id: 4, agent: 'Safety Agent', action: '安全检查', time: '2025-01-19 23:42:08', status: 'warning' },
    { id: 5, agent: 'EMS Agent', action: '紧急响应', time: '2025-01-19 23:41:22', status: 'completed' },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 3 }}>
        交互记录
      </Typography>
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