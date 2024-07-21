import React, { useEffect, useState } from 'react';
import { getUsers, getTokens } from '../../services/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
        const tokensData = await getTokens();
        setTokens(tokensData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.email}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Tokens</h2>
        <ul>
          {tokens.map(token => (
            <li key={token._id}>{token.name}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;