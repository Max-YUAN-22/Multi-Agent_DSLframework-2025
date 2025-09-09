// frontend/src/components/InteractionHistory.jsx
import React from 'react';
import './InteractionHistory.css';
import WebSocketService from './WebSocketService';

const InteractionHistory = ({ events = [], onClear, onGenerateReport, readyState }) => {
  const getStatusPill = () => {
    switch (readyState) {
      case 0: // CONNECTING
        return <span className="pill pill-status-connecting">Connecting...</span>;
      case 1: // OPEN
        return <span className="pill pill-status-open">Connected</span>;
      case 2: // CLOSING
        return <span className="pill pill-status-closing">Disconnecting...</span>;
      case 3: // CLOSED
        return <span className="pill pill-status-closed">Service Unavailable</span>;
      default:
        return <span className="pill pill-status-closed">Service Unavailable</span>;
    }
  };

  const handleReconnect = () => {
    WebSocketService.reconnect();
  };

  const renderEvent = (event) => {
    if (!event) {
      return <p>No event data</p>;
    }

    const { type, payload, title, timestamp } = event;
    const time = timestamp ? new Date(timestamp).toLocaleTimeString() : 'No timestamp';

    switch (type) {
      case 'agent_message':
        return (
          <div className="p-2 bg-blue-100 rounded">
            <p className="font-bold">{title || 'Agent Message'}</p>
            <p>{payload}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        );
      case 'agent_response':
        return (
          <div className="p-2 bg-green-100 rounded">
            <p className="font-bold">{title || 'Agent Response'}</p>
            <p><strong>Agent:</strong> {payload.agent}</p>
            <p><strong>Result:</strong> {payload.result}</p>
            {payload.triggered_by && <p><strong>Triggered by:</strong> {payload.triggered_by}</p>}
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        );
      case 'analysis_report':
        return (
          <div className="p-2 bg-purple-100 rounded">
            <p className="font-bold">{title || 'Analysis Report'}</p>
            <pre className="whitespace-pre-wrap">{payload.report}</pre>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        );
      case 'traffic_incident':
        return (
          <div className="p-2 bg-yellow-100 rounded">
            <p className="font-bold">Traffic Incident Report</p>
            <p>Location: {payload.location}</p>
            <p>Description: {payload.description}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        );
      case 'error':
        return (
          <div className="p-2 bg-red-100 rounded">
            <p className="font-bold">Error</p>
            <p>{payload}</p>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        );
      case 'ping':
        return null; // Don't display ping messages
      default:
        return (
          <div className="p-2 bg-gray-100 rounded">
            <p className="font-bold">Unknown Event: {type}</p>
            <pre className="whitespace-pre-wrap">{JSON.stringify(payload, null, 2)}</pre>
            <p className="text-xs text-gray-500">{time}</p>
          </div>
        );
    }
  };

  return (
    <div className="interaction-record card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="card__title">📊 Interaction History</h2>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {getStatusPill()}
          {readyState !== 1 && (
            <button onClick={handleReconnect} className="reconnect-btn" style={{ marginLeft: '1rem' }}>Reconnect</button>
          )}
          <button onClick={onGenerateReport} className="generate-btn" style={{ marginLeft: '1rem' }}>Generate Report</button>
          <button onClick={onClear} className="clear-btn" style={{ marginLeft: '1rem' }}>Clear History</button>
        </div>
      </div>
      <div className="history-scroll">
        {events.length === 0 ? (
          <p className="muted">No records yet. Send tasks to view interaction history.</p>
        ) : (
          <ul className="history">
            {events.map((event, index) => (
              <li key={`${event.type}-${event.timestamp || index}-${index}`}>{renderEvent(event)}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InteractionHistory;