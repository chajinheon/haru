import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const requestDailySummary = (token) => {
  return axios.post(`${API_URL}/api/v1/ai/feedback/request-daily-summary`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.data); // Return response.data
};

const getLatestDailySummary = (token) => {
  return axios.get(`${API_URL}/api/v1/ai/feedback/latest-daily-summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(response => response.data); // Return response.data
};

export default {
  requestDailySummary,
  getLatestDailySummary,
};
