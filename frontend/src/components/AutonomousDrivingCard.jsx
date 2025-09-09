import React, { useState } from 'react';
import './Card.css';

const AutonomousDrivingCard = ({ onSend, readyState }) => {
  const [startLocation, setStartLocation] = useState('A');
  const [endLocation, setEndLocation] = useState('B');
  const [passengers, setPassengers] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ start_location: startLocation, end_location: endLocation, passengers });
    }
  };

  return (
    <div className="card">
      <h2 className="card__title">🚗 Autonomous Driving Task</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__row">
          <label>
            <span>Start Location</span>
            <input type="text" name="start_location" value={startLocation} onChange={(e) => setStartLocation(e.target.value)} />
          </label>
          <label>
            <span>Destination</span>
            <input type="text" name="end_location" value={endLocation} onChange={(e) => setEndLocation(e.target.value)} />
          </label>
        </div>
        <label>
          <span>Passenger Count</span>
          <input type="number" name="passengers" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value, 10))} />
        </label>
        <div className="quickfill">
          <span>Quick Fill:</span>
          <button type="button" onClick={() => setStartLocation('A')}>A</button>
          <button type="button" onClick={() => setEndLocation('B')}>B</button>
        </div>
        <button type="submit" className="btn" disabled={readyState !== 1}>
          {readyState === 1 ? 'Send Task' : 'Connecting...'}
        </button>
      </form>
    </div>
  );
};

export default AutonomousDrivingCard;