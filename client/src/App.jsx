import React, { useEffect, useState } from 'react';
import MapView from './components/MapView';
import { getTokens } from './services/api';
import './App.css';

const App = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const data = await getTokens();
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Token Map Application</h1>
      </header>
      <MapView tokens={tokens} />
    </div>
  );
};

export default App;