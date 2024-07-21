import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../services/api';

const Nav = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/my-tokens">My Tokens</Link>
            </li>
            <li>
              <Link to="/saved-routes">Saved Routes</Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;