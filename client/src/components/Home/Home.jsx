import React, { useEffect, useState, useRef } from 'react';
import ImageBanner from '../ImageBanner';
import MapView from '../MapView';
import LocationButton from '../LocationButton';
import { getUserTokens, saveRoute } from '../../services/api';
import { calculateDistance, calculateDuration } from '../../utils/geolib';

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [isTracking, setIsTracking] = useState(false);
  const [userPath, setUserPath] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const watchId = useRef(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const data = await getUserTokens();
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    fetchTokens();
  }, []);

  const startTracking = () => {
    if (navigator.geolocation) {
      setStartTime(new Date());
      watchId.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPath((prevPath) => {
            const newPath = [...prevPath, { latitude, longitude, timestamp: new Date() }];
            const distance = calculateDistance(newPath);
            setTotalDistance(distance);
            return newPath;
          });
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
      const duration = calculateDuration(startTime, new Date());
      const routeData = { path: userPath, totalDistance, duration };
      saveRoute(routeData);
      console.log('Route saved:', routeData);
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
        <div>
          <p>Total Distance: {totalDistance.toFixed(2)} meters</p>
          <p>Duration: {startTime ? calculateDuration(startTime, new Date()) : 'N/A'}</p>
        </div>
      </div>
    </>
  );
};

export default Home;
