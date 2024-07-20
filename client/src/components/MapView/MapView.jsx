import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { captureToken } from '../../services/api';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = ({ tokens, userPath, onTokenCaptured }) => {
  useEffect(() => {
    console.log('Tokens in MapView:', tokens);
    console.log('User Path:', userPath);
  }, [tokens, userPath]);

  const handleCaptureToken = async (tokenId, latitude, longitude) => {
    try {
      await captureToken(tokenId, latitude, longitude);
      onTokenCaptured(tokenId);
    } catch (error) {
      console.error('Error capturing token:', error);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[40.416775, -3.703790]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {tokens.map(token => (
          <Marker 
            key={token._id} 
            position={[token.latitude, token.longitude]}
            opacity={token.captured ? 0.5 : 1} // Cambia la opacidad si el token está capturado
          >
            <Popup>
              {token.name}<br />{token.description}
              {!token.captured && (
                <button onClick={() => handleCaptureToken(token._id, userPath[userPath.length - 1][0], userPath[userPath.length - 1][1])}>
                  Capture Token
                </button>
              )}
            </Popup>
          </Marker>
        ))},
        {Array.isArray(tokens) && tokens.map(token => (
            <Marker 
            key={token._id} 
            position={[token.latitude, token.longitude]}
            opacity={token.captured ? 0.5 : 1}
          >
            {/* ... */}
          </Marker>
        ))},
        {userPath.length > 0 && (
          <>
            <Polyline positions={userPath} color="blue" />
            <Marker position={userPath[userPath.length - 1]}>
              <Popup>Your current location</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;