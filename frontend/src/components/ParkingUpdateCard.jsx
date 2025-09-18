import React, { useState } from 'react';
import './Card.css';

const ParkingUpdateCard = ({ onSend, readyState }) => {
  const [location, setLocation] = useState('City Center Parking');
  const [availableSpots, setAvailableSpots] = useState(150);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ location, available_spots: availableSpots });
    }
  };

  return (
    <div className="card">
      <h2 className="card__title">🅿️ Parking Update</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Location</span>
          <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          <span>Available Spots</span>
          <input type="number" name="available_spots" value={availableSpots} onChange={(e) => setAvailableSpots(parseInt(e.target.value, 10))} />
        </label>
        <button type="submit" className="btn" disabled={readyState !== 1}>
          {readyState === 1 ? 'Update Parking' : 'Connecting...'}
        </button>
      </form>
    </div>
  );
};

export default ParkingUpdateCard;