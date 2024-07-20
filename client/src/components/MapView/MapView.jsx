import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { captureToken, getUserTokens } from '../../services/api';
import { getDistance } from 'geolib';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="red" stroke="white" strokeWidth="2">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const heartIconUrl = `data:image/svg+xml;base64,${btoa(renderToStaticMarkup(<HeartIcon />))}`;

const capturedIcon = new L.Icon({
  iconUrl: heartIconUrl,
  iconSize: [25, 25],
  iconAnchor: [12, 25],
  popupAnchor: [1, -34],
});

const MapView = ({ userPath }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    console.log('Tokens in MapView:', tokens);
    console.log('User Path:', userPath);
  }, [tokens, userPath]);

  const fetchTokens = async () => {
    try {
      const fetchedTokens = await getUserTokens();
      setTokens(fetchedTokens);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const handleCaptureToken = async (tokenId, latitude, longitude) => {
    try {
      await captureToken(tokenId, latitude, longitude);
      await fetchTokens();
    } catch (error) {
      console.error('Error capturing token:', error);
    }
  };

  const isNearToken = (tokenLat, tokenLng) => {
    if (userPath.length === 0) return false;
    const [userLat, userLng] = userPath[userPath.length - 1];
    const distance = getDistance(
      { latitude: userLat, longitude: userLng },
      { latitude: tokenLat, longitude: tokenLng }
    );
    return distance <= 100;
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
              <button onClick={() => handleCaptureToken(token._id, userPath[userPath.length - 1][0], userPath[userPath.length - 1][1])}>
                Capture Token
              </button>
            </Popup>
          </Marker>
        ))}
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