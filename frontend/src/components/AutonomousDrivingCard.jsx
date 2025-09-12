import React, { useState } from 'react';
import './Card.css';

const AutonomousDrivingCard = ({ onSend, readyState }) => {
  const [startLocation, setStartLocation] = useState('北京西站');
  const [endLocation, setEndLocation] = useState('首都机场T3');
  const [passengers, setPassengers] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ start_location: startLocation, end_location: endLocation, passengers });
    }
  };

  const quickFillOptions = [
    {
      title: "Business Travel / 商务出行",
      description: "Executive transportation from Beijing West Station to Capital Airport T3 Terminal",
      data: { start_location: "北京西站", end_location: "首都机场T3", passengers: 2 }
    },
    {
      title: "Family Journey / 家庭出行", 
      description: "Multi-passenger autonomous vehicle service for family transportation",
      data: { start_location: "三里屯", end_location: "北京南站", passengers: 4 }
    },
    {
      title: "Emergency Medical / 紧急医疗",
      description: "Priority medical transport with autonomous vehicle coordination",
      data: { start_location: "朝阳医院", end_location: "协和医院", passengers: 1 }
    },
    {
      title: "Airport Transfer / 机场接送",
      description: "Premium airport shuttle service with intelligent routing optimization", 
      data: { start_location: "国贸", end_location: "首都机场T2", passengers: 3 }
    }
  ];

  const handleQuickFill = (option) => {
    setStartLocation(option.data.start_location);
    setEndLocation(option.data.end_location);
    setPassengers(option.data.passengers);
  };

  return (
    <div className="card-container autonomous-driving">
      <div className="card-header">
        <div className="card-icon">🚗</div>
        <div className="card-title">
          <h3>Autonomous Driving</h3>
          <p className="card-subtitle">Intelligent Vehicle Coordination</p>
        </div>
        <div className="card-status">
          <span className="connection-indicator"></span>
          <span className="connection-text">Connected</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Start Location</label>
          <input
            type="text"
            className="form-input"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Enter start location"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">End Location</label>
          <input
            type="text"
            className="form-input"
            value={endLocation}
            onChange={(e) => setEndLocation(e.target.value)}
            placeholder="Enter end location"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Passengers</label>
          <input
            type="number"
            className="form-input"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            min="1"
            max="8"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary"
          disabled={readyState !== 1}
        >
          Send Autonomous Driving Request
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

export default AutonomousDrivingCard;