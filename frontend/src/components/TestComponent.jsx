import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: 'white !important', 
      color: 'black !important',
      minHeight: '100vh',
      fontSize: '24px',
      textAlign: 'center',
      position: 'relative',
      zIndex: '9999'
    }}>
      <h1 style={{ color: 'black !important' }}>Test Component Working!</h1>
      <p style={{ color: 'black !important' }}>If you can see this, React is working correctly.</p>
    </div>
  );
};

export default TestComponent;
