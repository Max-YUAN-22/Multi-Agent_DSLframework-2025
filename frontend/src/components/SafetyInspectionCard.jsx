import React, { useState } from 'react';
import './Card.css';

const SafetyInspectionCard = ({ onSend, readyState }) => {
  const [location, setLocation] = useState('北京三元桥');
  const [requireHuman, setRequireHuman] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ location, require_human_intervention: requireHuman });
    }
  };

  const quickFillOptions = [
    {
      title: "Bridge Inspection / 桥梁检查",
      description: "Structural integrity assessment with AI-powered anomaly detection",
      data: { location: "北京三元桥", require_human_intervention: true }
    },
    {
      title: "Metro Safety / 地铁安全", 
      description: "Underground infrastructure monitoring with predictive maintenance algorithms",
      data: { location: "北京地铁1号线", require_human_intervention: true }
    },
    {
      title: "Building Safety / 建筑安全",
      description: "High-rise structural analysis with real-time sensor data integration",
      data: { location: "国贸大厦", require_human_intervention: true }
    },
    {
      title: "Road Safety / 道路安全",
      description: "Traffic infrastructure assessment with computer vision analysis", 
      data: { location: "长安街", require_human_intervention: true }
    }
  ];

  const handleQuickFill = (option) => {
    setLocation(option.data.location);
    setRequireHuman(option.data.require_human_intervention);
  };

  return (
    <div className="card-container safety-inspection">
      <div className="card-header">
        <div className="card-icon">🛡️</div>
        <div className="card-title">
          <h3>Safety Inspection</h3>
          <p className="card-subtitle">Security & Compliance</p>
        </div>
        <div className="card-status">
          <span className="connection-indicator"></span>
          <span className="connection-text">Connected</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter inspection location"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Require Human Intervention</label>
          <select
            className="form-input"
            value={requireHuman}
            onChange={(e) => setRequireHuman(e.target.value === 'true')}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          className="btn-primary"
          disabled={readyState !== 1}
        >
          Send Safety Inspection Request
        </button>
      </form>
      
      <div className="quick-fill">
        <h3>Quick Fill Options</h3>
        <div className="quick-fill-grid">
          {quickFillOptions.map((option, index) => (
            <div 
              key={index}
              className="quick-fill__option"
              onClick={() => handleQuickFill(option)}
            >
              <div className="quick-fill__title">{option.title}</div>
              <div className="quick-fill__description">{option.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyInspectionCard;