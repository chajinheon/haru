import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'; // Default to localhost:8000 if not set

const signup = (email, password, fullName) => {
  return axios.post(`${API_URL}/api/v1/signup`, {
    email,
    password,
    full_name: fullName,
  });
};

const login = (email, password) => {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  return axios.post(`${API_URL}/api/v1/login/token`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export default {
  signup,
  login,
};
