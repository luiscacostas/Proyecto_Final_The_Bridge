import React, { useEffect, useState } from 'react';
import { getSavedRoutes } from '../../services/api';


const SavedRoutes = () => {
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

  return (
    <div className="saved-routes">
  <h2>My Saved Routes</h2>
  {routes.length === 0 ? (
    <p>You haven't saved any routes yet.</p>
  ) : (
    <ul>
      {routes.map((route, index) => (
        <li key={index}>
          <p>Distance: {route.totalDistance.toFixed(2)} meters</p>
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
  )}
</div>
  );
};

export default SavedRoutes;