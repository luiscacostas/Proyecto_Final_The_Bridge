import React, { useEffect, useState, useRef } from 'react';
import ImageBanner from '../ImageBanner/ImageBanner';
import MapView from '../MapView';
import SavedRoutes from '../SavedRoutes/SavedRoutes';
import LocationButton from '../LocationButton';
import { getUserTokens, getTokens } from '../../services/api';

const Home = ({ isAuthenticated }) => {
  const [tokens, setTokens] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [userPath, setUserPath] = useState([]);
  const watchId = useRef(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        let data;
        if (isAuthenticated) {
          data = await getUserTokens();
        } else {
          data = await getTokens();
        }
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    fetchTokens();
  }, [isAuthenticated]);

  const startTracking = () => {
    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPath((prevPath) => [...prevPath, { latitude, longitude, timestamp: new Date() }]);
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
    }
  };

  const handleTokenCaptured = (tokenId) => {
    setTokens(prevTokens => prevTokens.map(token => 
      token._id === tokenId ? { ...token, captured: true } : token
    ));
  };

  return (
    <>
      <div className="App">
        <h1>TOKEN GO!</h1>
        <ImageBanner />
      </div>
      <div>
        <LocationButton onStart={startTracking} onStop={stopTracking} isTracking={isTracking} />
        <MapView tokens={tokens} userPath={userPath} onTokenCaptured={handleTokenCaptured} />
      </div>
      <SavedRoutes userPath={userPath} isTracking={isTracking} />
    </>
  );
};

export default Home;