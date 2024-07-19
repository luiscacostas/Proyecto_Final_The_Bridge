import React from 'react';

const LocationButton = ({ onStart, onStop, isTracking }) => {
  return (
    <div>
      {isTracking ? (
        <button onClick={onStop}>Stop Tracking</button>
      ) : (
        <button onClick={onStart}>Start Tracking</button>
      )}
    </div>
  );
};

export default LocationButton;