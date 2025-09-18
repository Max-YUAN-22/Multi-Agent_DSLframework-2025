import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';
import MainLayout from './layouts/MainLayout';

// 懒加载页面组件以优化性能
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const DSLDemoPage = lazy(() => import('./pages/DSLDemoPage.jsx'));
const AcademicPage = lazy(() => import('./pages/AcademicPage.jsx'));
const EnterpriseDashboard = lazy(() => import('./components/EnterpriseDashboard.jsx'));
const UserSettings = lazy(() => import('./pages/UserSettings.jsx'));

// 加载中组件
const LoadingSpinner = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="400px"
  >
    <CircularProgress size={60} />
  </Box>
);

function App() {
  return (
    <MainLayout>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dsl-demo" element={<DSLDemoPage />} />
            <Route path="/academic" element={<AcademicPage />} />
            <Route path="/dashboard" element={<EnterpriseDashboard />} />
            <Route path="/settings" element={<UserSettings />} />
          </Routes>
        </Suspense>
      </Container>
    </MainLayout>
  );
}

export default App;