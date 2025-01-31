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

const capturedIcon = new L.DivIcon({
  html: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF0000"/>
    </svg>
  `,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});

const MapView = ({ tokens, userPath, onTokenCaptured, isAuthenticated }) => {
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
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {tokens.map(token => (
      <Marker
        key={token._id}
        position={[token.latitude, token.longitude]}
        icon={token.captured ? capturedIcon : new L.Icon.Default()}
      >
        <Popup>
          {token.name}<br />{token.description}
          {!token.captured && (
            isAuthenticated ? (
              <button className="leaflet-popup-button" onClick={() => handleCaptureToken(token._id)}>
                Capture Token
              </button>
            ) : (
              <p>Please <a href="/login">login</a> or <a href="/register">register</a> to capture tokens.</p>
            )
          )}
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
