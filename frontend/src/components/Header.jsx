// frontend/src/components/Header.jsx
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="page__header">
      <div className="header-content">
        <h1 className="main-title">Multi-Agent DSL Framework</h1>
        <h2 className="subtitle">Intelligent City Management & Autonomous Driving Coordination</h2>
        <p className="description">A real-time multi-agent system powered by Domain-Specific Language (DSL) orchestration</p>
      </div>
    </header>
  );
};

export default Header;