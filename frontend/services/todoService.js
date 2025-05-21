import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const createTodo = (token, todoData) => {
  return axios.post(`${API_URL}/api/v1/todos/`, todoData, { // Ensure trailing slash if backend expects it
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getTodos = (token) => {
  return axios.get(`${API_URL}/api/v1/todos/`, { // Ensure trailing slash if backend expects it
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateTodo = (token, todoId, todoData) => {
  return axios.put(`${API_URL}/api/v1/todos/${todoId}`, todoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteTodo = (token, todoId) => {
  return axios.delete(`${API_URL}/api/v1/todos/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
