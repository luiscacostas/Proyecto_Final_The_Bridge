const API_URL = 'https://proyecto-final-the-bridge.onrender.com/api';

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to register');
  }
  return await response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error('Failed to login');
  }
  const data = await response.json();
  localStorage.setItem('token', data.token); // Almacena el token en el localStorage
  return data;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const getTokens = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tokens`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tokens');
  }
  return await response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};


export const getUserTokens = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tokens/user-tokens`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
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

export const captureToken = async (tokenId, latitude, longitude) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tokens/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ tokenId, latitude, longitude }),
  });
  if (!response.ok) {
    throw new Error('Failed to capture token');
  }
  return await response.json();
};

export const deleteToken = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tokens/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete token');
  }
  return await response.json();
};

export const updateToken = async (id, tokenData) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/tokens/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(tokenData),
  });
  if (!response.ok) {
    throw new Error('Failed to update token');
  }
  return await response.json();
};
