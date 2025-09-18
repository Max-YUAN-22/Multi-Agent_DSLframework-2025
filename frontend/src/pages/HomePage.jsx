import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Group as GroupIcon,
  Code as CodeIcon,
  Science as ScienceIcon,
  CheckCircle as CheckCircleIcon,
  Star as StarIcon,
} from '@mui/icons-material';

function HomePage() {
  const features = [
    {
      title: 'ATSLP算法',
      subtitle: '自适应任务调度与负载预测',
      description: '基于历史模式和智能体专业化的创新调度算法，实现最优任务分配',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      color: 'primary',
    },
    {
      title: 'HCMPL算法',
      subtitle: '分层缓存管理与模式学习',
      description: '使用机器学习技术的智能缓存算法，实现多级缓存管理',
      icon: <MemoryIcon sx={{ fontSize: 40 }} />,
      color: 'secondary',
    },
    {
      title: 'CALK算法',
      subtitle: '协作智能体学习与知识转移',
      description: '基于能力相似性的知识转移算法，加速学习过程',
      icon: <GroupIcon sx={{ fontSize: 40 }} />,
      color: 'success',
    },
  ];

  const achievements = [
    { metric: '2.17x', label: '吞吐量提升', icon: <SpeedIcon /> },
    { metric: '1000+', label: '智能体支持', icon: <GroupIcon /> },
    { metric: '85%+', label: '缓存命中率', icon: <MemoryIcon /> },
    { metric: '40-60%', label: '延迟减少', icon: <TrendingUpIcon /> },
  ];

  const applications = [
    '智能城市管理',
    '自动驾驶协调',
    '医疗健康服务',
    '金融服务优化',
    '供应链管理',
    '能源系统调度',
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
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 700 }}
              >
                多智能体DSL框架
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ opacity: 0.9, mb: 3 }}
              >
                自适应调度与协作学习的创新解决方案
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: '1.1rem', mb: 4, opacity: 0.9 }}
              >
                我们提出了一个新颖的多智能体领域特定语言(DSL)框架，通过三个创新算法解决分布式智能体协调的关键挑战：
                ATSLP、HCMPL和CALK算法。
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CodeIcon />}
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'grey.100' },
                  }}
                >
                  体验DSL演示
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ScienceIcon />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  查看学术论文
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  color: 'text.primary',
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  核心创新算法
                </Typography>
                <List dense>
                  {features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ color: `${feature.color}.main` }}>
                        {feature.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={feature.title}
                        secondary={feature.subtitle}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
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
            性能突破
          </Typography>
          <Grid container spacing={3}>
            {achievements.map((achievement, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    height: '100%',
                    background: 'linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)',
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: 'primary.main', mb: 1 }}>
                      {achievement.icon}
                    </Box>
                    <Typography
                      variant="h4"
                      component="div"
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
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        color: `${feature.color}.main`,
                        mb: 2,
                        textAlign: 'center',
                      }}
                    >
                      {feature.icon}
                    </Box>
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
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Chip
                      label="创新算法"
                      color={feature.color}
                      size="small"
                      icon={<StarIcon />}
                    />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Applications */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 600, mb: 4 }}
          >
            应用场景
          </Typography>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
            }}
          >
            <Grid container spacing={2}>
              {applications.map((app, index) => (
                <Grid item xs={6} md={4} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ color: 'success.main', mr: 1, fontSize: 20 }}
                    />
                    <Typography variant="body1">{app}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
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
              阅读学术论文
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;