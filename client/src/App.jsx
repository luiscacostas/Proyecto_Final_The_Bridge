import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Nav from './components/Nav';
import AdminDashboard from './components/AdminDashboard';
//import UserTokens from './components/UserTokens';
import SavedRoutes from './components/SavedRoutes/SavedRoutes'; 
import './styles/style.scss';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);
  const [userPath, setUserPath] = useState([]);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  return (
    <Router>
      <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} isAdmin={isAdmin} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <Home 
            isAuthenticated={isAuthenticated} 
            userPath={userPath}
            setUserPath={setUserPath}
            isTracking={isTracking}
            setIsTracking={setIsTracking}
          />
        } />
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/home" />} />
        <Route path="/saved-routes" element={
          <SavedRoutes 
            userPath={userPath} 
            isTracking={isTracking}
          />
        } />
      </Routes>
    </Router>
  )
};

export default App;
