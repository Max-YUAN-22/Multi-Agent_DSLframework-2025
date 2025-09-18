// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Button, Card, Grid, TextField } from '@mui/material';
import WebSocketService from './WebSocketService';
import InteractionHistory from './InteractionHistory';

const backendPort = process.env.REACT_APP_BACKEND_PORT || 8008;
const wsUrl = `http://localhost:${backendPort}`;

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [readyState, setReadyState] = useState(0); // 0 = connecting, 1 = open, 2 = closing, 3 = closed
  const [city, setCity] = useState('');
  const [simulationInProgress, setSimulationInProgress] = useState(false);

  useEffect(() => {
    WebSocketService.connect(wsUrl);
    
    WebSocketService.on('connect', () => {
      setReadyState(1); // OPEN
    });

    WebSocketService.on('disconnect', () => {
      setReadyState(3); // CLOSED
    });

    WebSocketService.on('message', (data) => {
      if (data.type === 'simulation_step' || data.type === 'simulation_end') {
        setEvents(prev => [...prev, {
          type: data.type,
          title: data.title,
          payload: data.payload.details,
          timestamp: new Date().toISOString()
        }]);
        if (data.type === 'simulation_end') {
          setSimulationInProgress(false);
        }
      } else if (data.type === 'analysis_report') {
        setEvents(prev => [...prev, {
          type: 'analysis_report',
          payload: data.payload.report,
          timestamp: new Date().toISOString()
        }]);
      } else {
        setEvents(prev => [...prev, data]);
      }
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  const startSimulation = async (eventType) => {
    if (simulationInProgress) return;
    setSimulationInProgress(true);
    try {
      const response = await fetch(`http://127.0.0.1:${backendPort}/simulate/${eventType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Failed to start simulation');
      }
    } catch (error) {
      console.error('Error starting simulation:', error);
      setSimulationInProgress(false);
    }
  };

  const generateReport = async () => {
    const recentEvents = events.slice(-5);
    try {
      const response = await fetch(`http://127.0.0.1:${backendPort}/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: recentEvents }),
      });
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      // The report will be sent back via WebSocket
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const clearHistory = () => {
    setEvents([]);
    setSimulationInProgress(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card style={{ padding: 20 }}>
            <h2>Smart City Simulation</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 10 }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" onClick={() => startSimulation('autonomous_driving')} disabled={simulationInProgress}>Autonomous Driving</Button>
                <Button variant="contained" onClick={() => startSimulation('weather_alert')} disabled={simulationInProgress}>Weather Alert</Button>
                <Button variant="contained" onClick={() => startSimulation('parking_update')} disabled={simulationInProgress}>Parking Update</Button>
                <Button variant="contained" onClick={() => startSimulation('safety_inspection')} disabled={simulationInProgress}>Safety Inspection</Button>
              </div>

            </div>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InteractionHistory 
            events={events}
            onClear={clearHistory}
            onGenerateReport={generateReport}
            readyState={readyState}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
