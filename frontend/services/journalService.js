import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const createJournalEntry = (token, entryData) => {
  return axios.post(`${API_URL}/api/v1/journals/`, entryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getJournalEntries = (token) => {
  return axios.get(`${API_URL}/api/v1/journals/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateJournalEntry = (token, entryId, entryData) => {
  return axios.put(`${API_URL}/api/v1/journals/${entryId}`, entryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteJournalEntry = (token, entryId) => {
  return axios.delete(`${API_URL}/api/v1/journals/${entryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createJournalEntry,
  getJournalEntries,
  updateJournalEntry,
  deleteJournalEntry,
};
