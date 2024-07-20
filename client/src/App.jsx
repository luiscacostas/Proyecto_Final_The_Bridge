import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Nav from './components/Nav';
import AdminDashboard from './components/AdminDashboard';
import UserTokens from './components/UserTokens'; 
import SavedRoutes from './components/SavedRoutes';
import './styles/style.scss';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(false);

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
      <Nav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/my-tokens" element={isAuthenticated ? <UserTokens /> : <Navigate to="/login" />} />
        <Route path="/saved-routes" element={isAuthenticated ? <SavedRoutes /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
};

export default App;