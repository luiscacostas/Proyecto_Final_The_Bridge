import React from 'react';

const LocationButton = ({ onStart, onStop, isTracking }) => {
  return (
    <div className="location-button-container">
      {isTracking ? (
    <button className="btn stop" onClick={onStop}>Stop Tracking</button>
  ) : (
    <button className="btn start" onClick={onStart}>Start Tracking</button>
  )}
</div>
  );
};

export default LocationButton;