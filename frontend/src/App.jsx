import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import UserSettings from './pages/UserSettings';
import EnterpriseDashboard from './components/EnterpriseDashboard';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <div 
        className="App"
        style={{ 
          backgroundImage: `url(${process.env.PUBLIC_URL + '/background.webp'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh'
        }}
      >
        <Navigation />
        <EventProvider>
          <Routes>
            <Route path="/" element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            } />
            <Route path="/dashboard" element={<EnterpriseDashboard />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </EventProvider>
      </div>
    </Router>
  );
}

export default App;
