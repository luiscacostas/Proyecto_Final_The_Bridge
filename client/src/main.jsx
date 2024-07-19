import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Asegúrate de importar el CSS global
import 'leaflet/dist/leaflet.css';  // Asegúrate de importar el CSS de Leaflet

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);