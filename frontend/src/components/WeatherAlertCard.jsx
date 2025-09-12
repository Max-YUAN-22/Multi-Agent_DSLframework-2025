import React, { useState } from 'react';
import './Card.css';

const WeatherAlertCard = ({ onSend, readyState }) => {
  const [location, setLocation] = useState('北京市朝阳区');
  const [alertType, setAlertType] = useState('heavy_rain');
  const [severity, setSeverity] = useState(8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ location, alert_type: alertType, severity });
    }
  };

  const quickFillOptions = [
    {
      title: "Heavy Rain Alert / 暴雨预警",
      description: "Advanced meteorological monitoring system detecting severe precipitation patterns",
      data: { location: "北京市朝阳区", alert_type: "heavy_rain", severity: 8 }
    },
    {
      title: "Typhoon Warning / 台风预警", 
      description: "Real-time atmospheric pressure analysis with wind velocity prediction",
      data: { location: "上海市浦东新区", alert_type: "strong_wind", severity: 9 }
    },
    {
      title: "Blizzard Alert / 暴雪预警",
      description: "Multi-sensor weather station network detecting extreme snowfall conditions",
      data: { location: "哈尔滨市道里区", alert_type: "snow_storm", severity: 7 }
    },
    {
      title: "Heat Wave Alert / 高温预警",
      description: "Thermal monitoring system identifying dangerous temperature elevation patterns", 
      data: { location: "广州市天河区", alert_type: "heat_wave", severity: 6 }
    }
  ];

  const handleQuickFill = (option) => {
    setLocation(option.data.location);
    setAlertType(option.data.alert_type);
    setSeverity(option.data.severity);
  };

  return (
    <div className="card-container weather-alert">
      <div className="card-header">
        <div className="card-icon">🌤️</div>
        <div className="card-title">
          <h3>Weather Alert</h3>
          <p className="card-subtitle">Environmental Monitoring</p>
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
            placeholder="Enter location"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Alert Type</label>
          <select
            className="form-input"
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
          >
            <option value="heavy_rain">Heavy Rain</option>
            <option value="strong_wind">Strong Wind</option>
            <option value="snow_storm">Snow Storm</option>
            <option value="heat_wave">Heat Wave</option>
          </select>
        </div>
        
        <div className="form-group">
          <label className="form-label">Severity (1-10)</label>
          <input
            type="number"
            className="form-input"
            value={severity}
            onChange={(e) => setSeverity(parseInt(e.target.value))}
            min="1"
            max="10"
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary"
          disabled={readyState !== 1}
        >
          Send Weather Alert
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

export default WeatherAlertCard;