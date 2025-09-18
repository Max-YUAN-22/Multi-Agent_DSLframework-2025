import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Container, AppBar, Toolbar, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import { Science as ScienceIcon, Code as CodeIcon, School as SchoolIcon, Dashboard as DashboardIcon } from '@mui/icons-material';

// 创建企业级主题
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
      paper: '#ffffff',
    },
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
  },
});

// 简化的首页组件
function HomePage() {
  const features = [
    {
      title: 'ATSLP算法',
      subtitle: '自适应任务调度与负载预测',
      description: '基于历史模式和智能体专业化的创新调度算法，实现最优任务分配',
      color: 'primary',
    },
    {
      title: 'HCMPL算法',
      subtitle: '分层缓存管理与模式学习',
      description: '使用机器学习技术的智能缓存算法，实现多级缓存管理',
      color: 'secondary',
    },
    {
      title: 'CALK算法',
      subtitle: '协作智能体学习与知识转移',
      description: '基于能力相似性的知识转移算法，加速学习过程',
      color: 'success',
    },
  ];

  const achievements = [
    { metric: '2.17x', label: '吞吐量提升' },
    { metric: '1000+', label: '智能体支持' },
    { metric: '85%+', label: '缓存命中率' },
    { metric: '40-60%', label: '延迟减少' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700, textAlign: 'center' }}
          >
            多智能体DSL框架
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ opacity: 0.9, mb: 3, textAlign: 'center' }}
          >
            自适应调度与协作学习的创新解决方案
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '1.1rem', mb: 4, opacity: 0.9, textAlign: 'center' }}
          >
            我们提出了一个新颖的多智能体领域特定语言(DSL)框架，通过三个创新算法解决分布式智能体协调的关键挑战：
            ATSLP、HCMPL和CALK算法。
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Performance Metrics */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 600, mb: 4 }}
          >
            性能指标概览
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card sx={{ textAlign: 'center', height: '100%' }}>
                  <CardContent>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: 'primary.main' }}
                    >
                      {achievement.metric}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Core Features */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 600, mb: 4 }}
          >
            核心算法特性
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 600, textAlign: 'center' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      gutterBottom
                      sx={{ textAlign: 'center', mb: 2 }}
                    >
                      {feature.subtitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Chip
                        label="创新算法"
                        color={feature.color}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, mb: 2 }}
          >
            立即体验创新技术
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            通过我们的交互式演示，深入了解多智能体DSL框架的强大功能和创新算法
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CodeIcon />}
              sx={{ px: 4 }}
            >
              开始DSL演示
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ScienceIcon />}
              sx={{ px: 4 }}
            >
              查看学术论文
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// 简化的导航栏
function Navigation() {
  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ScienceIcon sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            多智能体DSL框架
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" startIcon={<CodeIcon />}>
            DSL演示
          </Button>
          <Button color="inherit" startIcon={<SchoolIcon />}>
            学术论文
          </Button>
          <Button color="inherit" startIcon={<DashboardIcon />}>
            企业仪表板
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// 简化的App组件
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dsl-demo" element={<HomePage />} />
          <Route path="/academic" element={<HomePage />} />
          <Route path="/dashboard" element={<HomePage />} />
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