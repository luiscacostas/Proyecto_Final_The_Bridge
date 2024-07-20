import React, { useEffect, useState, useRef } from 'react';
import ImageBanner from '../ImageBanner/ImageBanner';
import MapView from '../MapView';
import LocationButton from '../LocationButton';
import { getUserTokens } from '../../services/api';

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [userPath, setUserPath] = useState([]);
  const watchId = useRef(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        console.log('Fetching tokens...');
        const data = await getUserTokens();
        console.log('Tokens received:', data);
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };
  
    fetchTokens();
  }, []);

  const startTracking = () => {
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPath((prevPath) => [...prevPath, [latitude, longitude]]);
        },
        (error) => console.error('Error getting position:', error),
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
      setIsTracking(true);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const stopTracking = () => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setIsTracking(false);
      setUserPath([]); // Limpiar el recorrido del usuario
    }
  };

  const handleTokenCaptured = (tokenId) => {
    setTokens(tokens.map(token => token._id === tokenId ? { ...token, captured: true } : token));
  };

  return (
    <>
      <div className="App">
        <h1>Mi aplicación React</h1>
        <ImageBanner />
      </div>
      <div>
        <LocationButton onStart={startTracking} onStop={stopTracking} isTracking={isTracking} />
        <MapView tokens={tokens} userPath={userPath} onTokenCaptured={handleTokenCaptured} />
      </div>
    </>
  );
};

export default Home;