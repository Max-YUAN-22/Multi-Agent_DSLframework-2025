// frontend/src/components/SafetyInspectionCard.jsx
import React, { useState } from 'react';
import './Card.css';

const SafetyInspectionCard = ({ onSend, readyState }) => {
  const [location, setLocation] = useState('Bridge B');
  const [requireHuman, setRequireHuman] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSend) {
      onSend({ location, require_human_intervention: requireHuman });
    }
  };

  return (
    <div className="card">
      <h2 className="card__title">🔍 Safety Inspection</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Location</span>
          <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <div className="checkbox">
          <input
            type="checkbox"
            name="require_human_intervention"
            checked={requireHuman}
            onChange={(e) => setRequireHuman(e.target.checked)}
          />
          <span>Requires Human Intervention</span>
        </div>
        <button type="submit" className="btn" disabled={readyState !== 1}>
          {readyState === 1 ? 'Send Inspection' : 'Connecting...'}
        </button>
      </form>
    </div>
  );
};

export default SafetyInspectionCard;