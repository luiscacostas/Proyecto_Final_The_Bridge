import React, { useEffect, useState } from 'react';
import { getUserTokens } from '../../services/api';

const UserTokens = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const data = await getUserTokens();
        setTokens(data);
      } catch (error) {
        console.error('Error fetching user tokens:', error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="user-tokens">
      <h2>My Captured Tokens</h2>
      {tokens.length === 0 ? (
        <p>You haven't captured any tokens yet.</p>
      ) : (
        <ul>
          {tokens.map(token => (
            <li key={token._id}>
              <h3>{token.name}</h3>
              <p>{token.description}</p>
              <p>Location: {token.latitude}, {token.longitude}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserTokens;