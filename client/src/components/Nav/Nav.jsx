import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../services/api';

const Nav = ({ isAuthenticated, setIsAuthenticated}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    setIsAdmin(userRole === 'admin');
  }, [isAuthenticated]);
  
  const handleLogout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userRole');
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
            {isAuthenticated && isAdmin && (
              <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/saved-routes">Saved Routes</Link>
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