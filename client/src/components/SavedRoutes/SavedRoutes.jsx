import React, { useEffect, useState } from 'react';
import { getSavedRoutes, saveRoute } from '../../services/api';
import { getDistance, getPathLength } from 'geolib';

const SavedRoutes = ({ userPath, isTracking }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getSavedRoutes();
        setRoutes(data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    if (!isTracking && userPath.length > 0) {
      const saveCurrentRoute = async () => {
        try {
          const routeData = {
            path: userPath,
            totalDistance: calculateTotalDistance(userPath),
            duration: calculateDuration(userPath),
          };
          await saveRoute(routeData);
          // Actualizar la lista de rutas después de guardar
          const updatedRoutes = await getSavedRoutes();
          setRoutes(updatedRoutes);
        } catch (error) {
          console.error('Error saving route:', error);
        }
      };

      saveCurrentRoute();
    }
  }, [isTracking, userPath]);

  const calculateTotalDistance = (path) => {
    return getPathLength(path);
  };

  const calculateDuration = (path) => {
    if (path.length < 2) return '0 seconds';
    const start = new Date(path[0].timestamp);
    const end = new Date(path[path.length - 1].timestamp);
    const durationMs = end - start;
    return formatDuration(durationMs);
  };

  const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  };

  return (
    <div>
      <h2>Saved Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>
            <p>Distance: {(route.totalDistance / 1000).toFixed(2)} km</p>
            <p>Duration: {route.duration}</p>
            <p>Path:</p>
            <ul>
              {route.path.map((point, i) => (
                <li key={i}>
                  Lat: {point.latitude}, Lng: {point.longitude}, Time: {new Date(point.timestamp).toLocaleString()}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedRoutes;
