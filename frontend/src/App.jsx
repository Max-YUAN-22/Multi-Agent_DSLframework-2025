import React from 'react';
import { EventProvider } from './contexts/EventContext';
import { LanguageProvider } from './hooks/useTranslation';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  return (
    <div 
      className="App"
      style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '/background.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
      }}
    >
      <LanguageProvider>
        <EventProvider>
          <MainLayout>
          <HomePage />
        </MainLayout>
      </EventProvider>
      </LanguageProvider>
    </div>
  );
}

export default App;
