import React from 'react';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="App">
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;