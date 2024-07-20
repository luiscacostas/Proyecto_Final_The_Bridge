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

  const handleCaptureToken = async (tokenId) => {
    const lastPosition = userPath[userPath.length - 1];
    if (lastPosition) {
      try {
        await captureToken(tokenId, lastPosition.latitude, lastPosition.longitude);
        onTokenCaptured(tokenId);
      } catch (error) {
        console.error('Error capturing token:', error);
      }
    }
  };

  return (
    <div className="map-container">
      <MapContainer center={[40.416775, -3.703790]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {tokens.map(token => (
          <Marker key={token._id} position={[token.latitude, token.longitude]}>
            <Popup>
              {token.name}<br />{token.description}
              <button onClick={() => handleCaptureToken(token._id)}>
                Capture Token
              </button>
            </Popup>
          </Marker>
        ))}
        {userPath.length > 0 && (
          <>
            <Polyline positions={userPath.map(pos => [pos.latitude, pos.longitude])} color="blue" />
            <Marker position={[userPath[userPath.length - 1].latitude, userPath[userPath.length - 1].longitude]}>
              <Popup>Your current location</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;