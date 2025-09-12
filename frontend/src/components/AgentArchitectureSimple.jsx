import React, { useState, useEffect } from 'react';
import './AgentArchitecture.css';

const AgentArchitecture = () => {
  const [testState, setTestState] = useState('Component is working!');

  return (
    <div className="integrated-system-container">
      <div style={{
        backgroundColor: 'white',
        color: 'black !important',
        padding: '20px',
        margin: '20px',
        borderRadius: '10px',
        textAlign: 'center',
        fontSize: '24px'
      }}>
        <h1 style={{ color: 'black !important' }}>AgentArchitecture Component Test</h1>
        <p style={{ color: 'black !important' }}>{testState}</p>
        <button 
          onClick={() => setTestState('Button clicked! ' + new Date().toLocaleTimeString())}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Button
        </button>
      </div>
    </div>
  );
};

export default AgentArchitecture;
