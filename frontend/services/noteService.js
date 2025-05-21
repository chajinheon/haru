import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const createNote = (token, noteData) => {
  return axios.post(`${API_URL}/api/v1/notes/`, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getNotes = (token) => {
  return axios.get(`${API_URL}/api/v1/notes/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateNote = (token, noteId, noteData) => {
  return axios.put(`${API_URL}/api/v1/notes/${noteId}`, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteNote = (token, noteId) => {
  return axios.delete(`${API_URL}/api/v1/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
