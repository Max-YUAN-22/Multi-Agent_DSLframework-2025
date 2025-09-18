import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import AutonomousDrivingCard from '../components/AutonomousDrivingCard';
import WeatherAlertCard from '../components/WeatherAlertCard';
import ParkingUpdateCard from '../components/ParkingUpdateCard';
import SafetyInspectionCard from '../components/SafetyInspectionCard';
import InteractionHistory from '../components/InteractionHistory';
import SimpleWebSocketService from '../components/SimpleWebSocketService';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [readyState, setReadyState] = useState(0); // 0 = connecting, 1 = open, 2 = closing, 3 = closed
  const [connectionStats, setConnectionStats] = useState(null);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008';
    const wsUrl = backendUrl.replace('http', 'ws');
    console.log('🔌 尝试连接到:', wsUrl);
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

    const handleError = (error) => {
      console.error('❌ WebSocket error:', error);
      setReadyState(3); // WebSocket.CLOSED
    };

    SimpleWebSocketService.on('connect', handleConnect);
    SimpleWebSocketService.on('disconnect', handleDisconnect);
    SimpleWebSocketService.on('message', handleMessage);
    SimpleWebSocketService.on('error', handleError);

    return () => {
      console.log('🧹 Cleaning up WebSocket connection');
      SimpleWebSocketService.disconnect();
    };
  }, []);

  const handleSend = async (task, data) => {
    try {
      console.log('Sending task:', task, 'with data:', data, 'readyState:', readyState);
      
      // 根据任务类型发送到对应的API端点
      let endpoint = '';
      let payload = data;
      
      switch (task) {
        case 'autonomous_driving_task':
          endpoint = '/events/autonomous_driving';
          payload = {
            start_location: data.start_location || 'A',
            end_location: data.end_location || 'B',
            passengers: data.passengers || 2
          };
          break;
        case 'weather_alert_task':
          endpoint = '/events/weather_alert';
          payload = {
            area: data.location || 'City Center',
            alert_type: data.alert_type || 'heavy_rain',
            severity: data.severity || 8
          };
          break;
        case 'parking_update_task':
          endpoint = '/events/parking_update';
          payload = {
            location: data.location || 'City Center Parking',
            available_spots: data.available_spots || 150
          };
          break;
        case 'safety_inspection_task':
          endpoint = '/events/safety_inspection';
          payload = {
            location: data.location || 'Bridge B',
            safety_status: data.require_human_intervention ? 'warning' : 'ok',
            require_human_intervention: data.require_human_intervention || true
          };
          break;
        default:
          console.error('Unknown task type:', task);
          return;
      }
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008'}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('Task sent successfully');
      } else {
        console.error('Failed to send task:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending task:', error);
    }
  };

  const sendGenerateReport = async () => {
    try {
      console.log('Generating report...');
      
      // 获取最近的交互记录
      const recentEvents = messages.slice(-5).map(msg => ({
        type: msg.type,
        payload: msg.payload,
        title: msg.title,
        timestamp: msg.timestamp
      }));
      
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8008'}/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          events: recentEvents
        })
      });
      
      if (response.ok) {
        console.log('Report generation started');
      } else {
        console.error('Failed to generate report:', response.statusText);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
              Connection Status: {readyState === 1 ? '✅ Connected' : readyState === 0 ? '🔄 Connecting' : '❌ Disconnected'} | 
              Messages: {messages.length} | 
              Backend: http://localhost:8008
              {connectionStats && (
                <span style={{ marginLeft: '20px' }}>
                  | User ID: {connectionStats.userId} | 
                  Active Connections: {connectionStats.activeConnections}/{connectionStats.totalConnections}
                </span>
              )}
            </div>
            <InteractionHistory 
              events={messages} 
              readyState={readyState} 
              onGenerateReport={sendGenerateReport} 
              onClear={clearHistory} 
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <AutonomousDrivingCard 
            onSend={(data) => handleSend('autonomous_driving_task', data)} 
            readyState={readyState} 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <WeatherAlertCard 
            onSend={(data) => handleSend('weather_alert_task', data)} 
            readyState={readyState} 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ParkingUpdateCard 
            onSend={(data) => handleSend('parking_update_task', data)} 
            readyState={readyState} 
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <SafetyInspectionCard 
            onSend={(data) => handleSend('safety_inspection_task', data)} 
            readyState={readyState} 
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
