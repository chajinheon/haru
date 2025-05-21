import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import todoService from '../services/todoService';
import { useAuth } from './AuthContext'; // To get the token

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get token from AuthContext

  const fetchTodos = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await todoService.getTodos(token);
      setTodos(response.data || []);
    } catch (err) {
      console.error("Error fetching todos:", err);
      setError(err.response?.data?.detail || 'Failed to fetch todos.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addTodo = async (todoData) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await todoService.createTodo(token, todoData);
      setTodos(prevTodos => [...prevTodos, response.data]);
    } catch (err) {
      console.error("Error adding todo:", err);
      setError(err.response?.data?.detail || 'Failed to add todo.');
      throw err; // Re-throw to allow form to handle error
    } finally {
      setLoading(false);
    }
  };

  const editTodo = async (todoId, todoData) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await todoService.updateTodo(token, todoId, todoData);
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === todoId ? response.data : todo))
      );
    } catch (err) {
      console.error("Error editing todo:", err);
      setError(err.response?.data?.detail || 'Failed to edit todo.');
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (todoId) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await todoService.deleteTodo(token, todoId);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } catch (err) {
      console.error("Error removing todo:", err);
      setError(err.response?.data?.detail || 'Failed to remove todo.');
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  const toggleTodoComplete = async (todoId, currentStatus) => {
    if (!token) return;
    // No need to set global loading for this, can be handled in UI component if needed
    // setError(null); 
    try {
      const response = await todoService.updateTodo(token, todoId, { is_completed: !currentStatus });
      setTodos(prevTodos =>
        prevTodos.map(todo => (todo.id === todoId ? response.data : todo))
      );
    } catch (err) {
      console.error("Error toggling todo:", err);
      setError(err.response?.data?.detail || 'Failed to update todo status.');
      // Potentially revert UI change or show specific error for this item
    }
  };

  return (
    <TodoContext.Provider value={{ todos, loading, error, fetchTodos, addTodo, editTodo, removeTodo, toggleTodoComplete, setError }}>
      {children}
    </TodoContext.Provider>
  );
};
