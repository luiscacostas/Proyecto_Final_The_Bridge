import React, { useEffect, useState, useRef } from 'react';
import ImageBanner from '../ImageBanner/ImageBanner';
import MapView from '../MapView';
import LocationButton from '../LocationButton';
import { getUserTokens, getTokens, saveRoute } from '../../services/api';
import { getDistance } from 'geolib';

const Home = ({ isAuthenticated }) => {
  const [tokens, setTokens] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [userPath, setUserPath] = useState([]);
  const [startTime, setStartTime] = useState(null);
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
      setStartTime(new Date());
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

  const stopTracking = async () => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
      setIsTracking(false);
      const endTime = new Date();
      const duration = ((endTime - startTime) / 1000 / 60).toFixed(2); 

      let totalDistance = 0;
      for (let i = 0; i < userPath.length - 1; i++) {
        totalDistance += getDistance(
          { latitude: userPath[i].latitude, longitude: userPath[i].longitude },
          { latitude: userPath[i + 1].latitude, longitude: userPath[i + 1].longitude }
        );
      }

      if (isAuthenticated && userPath.length > 0) {
        try {
          await saveRoute({
            path: userPath,
            totalDistance,
            duration
          });
          alert('Route saved successfully');
        } catch (error) {
          console.error('Error saving route:', error);
        }
      }

      setUserPath([]);
    }
  };

  const handleTokenCaptured = (tokenId) => {
    setTokens(tokens.map(token => token._id === tokenId ? { ...token, captured: true } : token));
  };

  return (
    <>
      <div className="App">
        <h1>TOKEN GO!</h1>
        <ImageBanner />
      </div>
      <div>
        <LocationButton onStart={startTracking} onStop={stopTracking} isTracking={isTracking} />
        <MapView tokens={tokens} userPath={userPath} onTokenCaptured={handleTokenCaptured} isAuthenticated={isAuthenticated} />
      </div>
    </>
  );
};

export default Home;

