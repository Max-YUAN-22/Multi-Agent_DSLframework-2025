import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Box, Typography, Button } from '@mui/material';
import AgentArchitecture from '../components/AgentArchitecture';
import InteractionHistory from '../components/InteractionHistory';
import SimpleWebSocketService from '../components/SimpleWebSocketService';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [readyState, setReadyState] = useState(0); // 0 = connecting, 1 = open, 2 = closing, 3 = closed
  const [connectionStats, setConnectionStats] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // 优先使用环境变量，否则使用Render后端URL
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'https://multi-agent-dsl-backend.onrender.com';
    const wsUrl = backendUrl.replace('http', 'ws');
    console.log('🔌 尝试连接到:', wsUrl);
    console.log('🔧 环境变量 REACT_APP_BACKEND_URL:', process.env.REACT_APP_BACKEND_URL);
    SimpleWebSocketService.connect(wsUrl);

    const handleConnect = () => {
      setReadyState(1); // WebSocket.OPEN
      console.log('✅ WebSocket connected, readyState set to 1');
      // 更新连接统计信息
      setConnectionStats(SimpleWebSocketService.getConnectionStats());
    };

    const handleDisconnect = () => {
      setReadyState(3); // WebSocket.CLOSED
      console.log('❌ WebSocket disconnected, readyState set to 3');
    };

    const handleMessage = (data) => {
      try {
        console.log('📨 Received WebSocket message:', data);
        const message = typeof data === 'string' ? JSON.parse(data) : data;
        const messageWithTimestamp = {
          ...message,
          timestamp: message.timestamp || new Date().toISOString()
        };
        console.log('📝 Adding message to state:', messageWithTimestamp);
        setMessages((prevMessages) => [...prevMessages, messageWithTimestamp]);
      } catch (error) {
        console.error('❌ Error parsing WebSocket message:', error);
        setMessages((prevMessages) => [...prevMessages, { 
          type: 'raw', 
          payload: data, 
          timestamp: new Date().toISOString() 
        }]);
      }
    };

    // 注册事件监听器
    SimpleWebSocketService.on('connect', handleConnect);
    SimpleWebSocketService.on('disconnect', handleDisconnect);
    SimpleWebSocketService.on('message', handleMessage);

    // 清理函数
    return () => {
      SimpleWebSocketService.off('connect', handleConnect);
      SimpleWebSocketService.off('disconnect', handleDisconnect);
      SimpleWebSocketService.off('message', handleMessage);
    };
  }, []);

  const getConnectionStatus = () => {
    switch (readyState) {
      case 0: return '🔄 Connecting...';
      case 1: return '✅ Connected';
      case 2: return '⏳ Closing...';
      case 3: return '❌ Disconnected';
      default: return '❓ Unknown';
    }
  };

  const getBackendUrl = () => {
    return process.env.REACT_APP_BACKEND_URL || 'https://multi-agent-dsl-backend.onrender.com';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 连接状态显示 */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h6" gutterBottom>
              🔗 连接状态: {getConnectionStatus()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              后端地址: {getBackendUrl()}
            </Typography>
            {connectionStats && (
              <Typography variant="body2" color="text.secondary">
                消息数: {connectionStats.messageCount} | 连接时间: {connectionStats.connectionTime}
              </Typography>
            )}
          </Box>
          <Button 
            variant="outlined" 
            onClick={() => setShowHistory(!showHistory)}
            sx={{ minWidth: 120 }}
          >
            {showHistory ? '隐藏历史' : '显示历史'}
          </Button>
        </Box>
      </Paper>

      {/* 主要内容区域 */}
      <Grid container spacing={3}>
        {/* DSL多智能体界面 */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
              🤖 多智能体DSL框架
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
              12个智能体协作的完整DSL交互界面
            </Typography>
            <AgentArchitecture />
          </Paper>
        </Grid>

        {/* 交互历史 */}
        {showHistory && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>
              <Typography variant="h5" gutterBottom>
                📋 交互历史
              </Typography>
              <InteractionHistory messages={messages} />
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;