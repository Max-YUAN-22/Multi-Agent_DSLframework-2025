import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';
import { LanguageProvider } from './hooks/useTranslation';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import UserSettings from './pages/UserSettings';
import EnterpriseDashboard from './components/EnterpriseDashboard';
import Navigation from './components/Navigation';
import './App.css';
import './animations.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
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
              <Route path="/dashboard" element={
                <MainLayout>
                  <EnterpriseDashboard />
                </MainLayout>
              } />
              <Route path="/settings" element={
                <MainLayout>
                  <UserSettings />
                </MainLayout>
              } />
            </Routes>
          </EventProvider>
        </div>
      </LanguageProvider>
    </Router>
  );
}

export default App;
