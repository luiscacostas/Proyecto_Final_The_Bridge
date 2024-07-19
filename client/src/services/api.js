const API_URL = 'http://localhost:5000/api';

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};

export const getTokens = async () => {
  const response = await fetch(`${API_URL}/tokens`);
  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return await response.json();
};

export const getUserTokens = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/tokens`);
  if (!response.ok) {
    throw new Error('Failed to fetch user tokens');
  }
  return await response.json();
};

export const createUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return await response.json();
};

export const createToken = async (tokenData) => {
  const response = await fetch(`${API_URL}/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenData),
  });
  if (!response.ok) {
    throw new Error('Failed to create token');
  }
  return await response.json();
};
