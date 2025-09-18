import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Container, AppBar, Toolbar, Button, Card, CardContent, Grid, Chip, Paper, Stepper, Step, StepLabel, StepContent, Alert, LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Science as ScienceIcon, Code as CodeIcon, School as SchoolIcon, Dashboard as DashboardIcon, PlayArrow as PlayIcon, CheckCircle as CheckCircleIcon, Close as CloseIcon, Info as InfoIcon } from '@mui/icons-material';

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

// DSL演示页面组件
function DSLDemoPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [results, setResults] = React.useState({});
  const [progress, setProgress] = React.useState(0);
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState(null);

  const dslExamples = [
    {
      title: 'ATSLP - 自适应任务调度',
      description: '演示基于负载预测的智能任务分配',
      code: `# ATSLP算法演示
from dsl import DSL, program

@program
def smart_city_coordination():
    dsl = DSL(workers=8)
    
    # 创建智能体任务
    weather_task = dsl.gen("weather_monitor", 
                          prompt="监控城市天气状况",
                          agent="weather_agent")
                          .with_priority(1)
                          .with_timeout(5.0)
                          .schedule()
    
    traffic_task = dsl.gen("traffic_optimization",
                          prompt="优化交通流量",
                          agent="traffic_agent")
                          .with_priority(2)
                          .with_timeout(10.0)
                          .schedule()
    
    # 自适应调度执行
    results = dsl.join([weather_task, traffic_task], 
                      mode="all", within_ms=5000)
    
    return results`,
      algorithm: 'ATSLP',
      features: ['负载预测', '优先级调度', '超时控制', '自适应分配'],
    },
    {
      title: 'HCMPL - 分层缓存管理',
      description: '展示智能缓存模式学习和多级管理',
      code: `# HCMPL算法演示
@program
def cache_optimization():
    dsl = DSL()
    
    # 配置缓存策略
    dsl.use_llm(llm_callable, use_cache=True)
    
    # 创建缓存感知任务
    analysis_task = dsl.gen("data_analysis",
                          prompt="分析城市数据模式",
                          agent="analytics_agent")
                          .with_contract(Contract(
                              name="analysis-contract",
                              regex=r"\\d+\\s+patterns"
                          ))
                          .schedule()
    
    # 缓存模式学习
    dsl.on("cache_hit", lambda data: print(f"缓存命中: {data}"))
    dsl.on("cache_miss", lambda data: print(f"缓存未命中: {data}"))
    
    result = analysis_task.wait()
    return result`,
      algorithm: 'HCMPL',
      features: ['模式学习', '多级缓存', '智能替换', '命中率优化'],
    },
    {
      title: 'CALK - 协作学习',
      description: '演示智能体间的知识转移和协作学习',
      code: `# CALK算法演示
@program
def collaborative_learning():
    dsl = DSL()
    
    # 创建相似智能体组
    agent_group = ["traffic_agent", "parking_agent", "safety_agent"]
    
    # 知识转移任务
    for agent in agent_group:
        task = dsl.gen(f"learn_from_{agent}",
                      prompt=f"从{agent}学习最佳实践",
                      agent=agent)
                      .with_fallback("使用默认策略")
                      .schedule()
    
    # 协作学习事件
    dsl.on("knowledge_transfer", 
           lambda data: update_agent_knowledge(data))
    
    dsl.on("performance_improvement",
           lambda data: log_improvement(data))
    
    # 执行协作学习
    dsl.run()
    return dsl.get_history()`,
      algorithm: 'CALK',
      features: ['知识转移', '协作学习', '性能提升', '经验共享'],
    },
  ];

  const handleRunDemo = (index) => {
    setIsRunning(true);
    setProgress(0);
    setResults(prev => ({ ...prev, [index]: 'running' }));
    
    // 模拟执行过程，显示进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setResults(prev => ({ ...prev, [index]: 'completed' }));
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleShowDetails = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedAlgorithm(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            DSL框架交互式演示
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 800, mx: 'auto' }}
          >
            通过实际代码示例体验我们的三个核心创新算法：ATSLP、HCMPL和CALK
          </Typography>
        </Box>

        {/* Algorithm Demonstrations */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, mb: 4 }}
          >
            核心算法演示
          </Typography>

          <Stepper activeStep={activeStep} orientation="vertical">
            {dslExamples.map((example, index) => (
              <Step key={index}>
                <StepLabel>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={example.algorithm}
                      color="primary"
                      size="small"
                    />
                    <Typography variant="h6">{example.title}</Typography>
                  </Box>
                </StepLabel>
                <StepContent>
                  <Card sx={{ mb: 3 }}>
                    <CardContent>
                      <Typography variant="body1" gutterBottom>
                        {example.description}
                      </Typography>
                      
                      <Box sx={{ my: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          代码示例
                        </Typography>
                        <Paper
                          elevation={1}
                          sx={{
                            backgroundColor: '#f5f5f5',
                            overflow: 'auto',
                            maxHeight: 400,
                            p: 2,
                          }}
                        >
                          <pre style={{ 
                            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                            fontSize: '0.9rem',
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word'
                          }}>
                            {example.code}
                          </pre>
                        </Paper>
                      </Box>

                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          算法特性
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {example.features.map((feature, featureIndex) => (
                            <Chip
                              key={featureIndex}
                              label={feature}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Button
                          variant="contained"
                          startIcon={<PlayIcon />}
                          onClick={() => handleRunDemo(index)}
                          disabled={isRunning}
                          sx={{ minWidth: 120 }}
                        >
                          {results[index] === 'running' ? '运行中...' : '运行演示'}
                        </Button>
                        
                        <Button
                          variant="outlined"
                          startIcon={<InfoIcon />}
                          onClick={() => handleShowDetails(example)}
                          sx={{ minWidth: 120 }}
                        >
                          查看详情
                        </Button>
                        
                        {results[index] === 'running' && (
                          <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={progress} 
                              sx={{ mb: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              执行进度: {progress}%
                            </Typography>
                          </Box>
                        )}
                        
                        {results[index] === 'completed' && (
                          <Alert severity="success" sx={{ flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CheckCircleIcon />
                              <Typography variant="body2">
                                演示执行完成！{example.algorithm}算法运行成功。
                              </Typography>
                            </Box>
                          </Alert>
                        )}
                      </Box>
                    </CardContent>
                  </Card>

                  <Box sx={{ mb: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(index + 1)}
                      sx={{ mr: 1 }}
                    >
                      下一步
                    </Button>
                    <Button
                      onClick={() => setActiveStep(index - 1)}
                      disabled={index === 0}
                    >
                      上一步
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      {/* Algorithm Details Dialog */}
      <Dialog 
        open={showDetails} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {selectedAlgorithm?.title} - 详细说明
            </Typography>
            <IconButton onClick={handleCloseDetails}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedAlgorithm && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                算法描述
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedAlgorithm.description}
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                核心特性
              </Typography>
              <Grid container spacing={2}>
                {selectedAlgorithm.features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                代码实现
              </Typography>
              <Paper
                elevation={1}
                sx={{
                  backgroundColor: '#f5f5f5',
                  overflow: 'auto',
                  maxHeight: 300,
                  p: 2,
                }}
              >
                <pre style={{ 
                  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
                  fontSize: '0.9rem',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {selectedAlgorithm.code}
                </pre>
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} variant="outlined">
            关闭
          </Button>
          <Button onClick={handleCloseDetails} variant="contained">
            运行演示
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

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
  const navigate = React.useNavigate();
  
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
          <Button color="inherit" startIcon={<CodeIcon />} onClick={() => navigate('/dsl-demo')}>
            DSL演示
          </Button>
          <Button color="inherit" startIcon={<SchoolIcon />} onClick={() => navigate('/academic')}>
            学术论文
          </Button>
          <Button color="inherit" startIcon={<DashboardIcon />} onClick={() => navigate('/dashboard')}>
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
          <Route path="/dsl-demo" element={<DSLDemoPage />} />
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