import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getUserProfile = (token) => {
  return axios.get(`${API_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateUserProfile = (token, profileData) => {
  return axios.put(`${API_URL}/api/v1/users/me`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  getUserProfile,
  updateUserProfile,
  updatePassword,
  deleteAccount,
};

function updatePassword(token, passwordData) {
  return axios.put(`${API_URL}/api/v1/users/me/password`, passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function deleteAccount(token) {
  return axios.delete(`${API_URL}/api/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
