// frontend/src/components/WeatherAlertCard.jsx
import React, { useState } from 'react';
import './Card.css';

const WeatherAlertCard = ({ onSend, readyState }) => {
  const [location, setLocation] = useState('City Center');
  const [alertType, setAlertType] = useState('heavy_rain');
  const [severity, setSeverity] = useState(8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ location, alert_type: alertType, severity });
    }
  };

  return (
    <div className="card">
      <h2 className="card__title">🌦️ Weather Alert</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Location</span>
          <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          <span>Alert Type</span>
          <select value={alertType} onChange={(e) => setAlertType(e.target.value)}>
            <option value="heavy_rain">Heavy Rain</option>
            <option value="strong_wind">Strong Wind</option>
            <option value="snow_storm">Snow Storm</option>
            <option value="heat_wave">Heat Wave</option>
          </select>
        </label>
        <label>
          <span>Severity Level (1-10)</span>
          <input type="number" name="severity" min="1" max="10" value={severity} onChange={(e) => setSeverity(parseInt(e.target.value, 10))} />
        </label>
        <button type="submit" className="btn" disabled={readyState !== 1}>
          {readyState === 1 ? 'Send Alert' : 'Connecting...'}
        </button>
      </form>
    </div>
  );
};

export default WeatherAlertCard;