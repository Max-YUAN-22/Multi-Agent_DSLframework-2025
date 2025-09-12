import React, { useState } from 'react';
import './Card.css';

const ParkingUpdateCard = ({ onSend, readyState }) => {
  const [location, setLocation] = useState('北京朝阳大悦城停车场');
  const [availableSpots, setAvailableSpots] = useState(150);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ location, available_spots: availableSpots });
    }
  };

  const quickFillOptions = [
    {
      title: "Shopping Mall Peak / 商场高峰",
      description: "IoT sensor network monitoring real-time parking occupancy patterns",
      data: { location: "北京朝阳大悦城停车场", available_spots: 150 }
    },
    {
      title: "Hospital Parking / 医院停车", 
      description: "Medical facility parking management with priority allocation system",
      data: { location: "北京协和医院停车场", available_spots: 30 }
    },
    {
      title: "Airport Terminal / 机场停车",
      description: "Aviation hub parking optimization with dynamic pricing algorithms",
      data: { location: "首都机场T3停车场", available_spots: 200 }
    },
    {
      title: "Residential Zone / 住宅区",
      description: "Community parking resource allocation with smart access control", 
      data: { location: "望京SOHO地下停车场", available_spots: 80 }
    }
  ];

  const handleQuickFill = (option) => {
    setLocation(option.data.location);
    setAvailableSpots(option.data.available_spots);
  };

  return (
    <div className="card-container parking-update">
      <div className="card-header">
        <div className="card-icon">🅿️</div>
        <div className="card-title">
          <h3>Parking Update</h3>
          <p className="card-subtitle">Resource Management</p>
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
            placeholder="Enter parking location"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Available Spots</label>
          <input
            type="number"
            className="form-input"
            value={availableSpots}
            onChange={(e) => setAvailableSpots(parseInt(e.target.value))}
            min="0"
            max="1000"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary"
          disabled={readyState !== 1}
        >
          Send Parking Update
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

export default ParkingUpdateCard;