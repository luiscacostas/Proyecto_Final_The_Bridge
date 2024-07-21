import React, { useEffect, useState } from 'react';
import { getUserTokens } from '../../services/api';

const UserTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserTokens();
  }, []);

  const fetchUserTokens = async () => {
    try {
      setLoading(true);
      const fetchedTokens = await getUserTokens();
      setTokens(fetchedTokens.filter(token => token.captured));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user tokens:', error);
      setError('Failed to load tokens. Please try again.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-tokens-container">
  <h2>My Tokens</h2>
  {tokens.length === 0 ? (
    <p>You haven't saved any tokens yet.</p>
  ) : (
  <ul>
    {tokens.map((token) => (
      <li key={token._id} className={token.captured ? 'captured' : ''}>
        <span>{token.name}</span>
        <span>{token.description}</span>
      </li>
    ))}
  </ul>
  )}
</div>
  );
};

export default UserTokens;