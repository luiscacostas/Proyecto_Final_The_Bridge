import React, { useEffect, useState } from 'react';
import { getUsers, getTokens } from '../../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const tokensData = await getTokens();
        setUsers(usersData);
        setTokens(tokensData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div>
        <h3>Users</h3>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.email} - {user.role}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Tokens</h3>
        <ul>
          {tokens.map(token => (
            <li key={token._id}>{token.name} - {token.description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;