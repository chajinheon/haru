import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/authService';
import userService from '../services/userService'; // Import userService

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchUserProfile = async (currentToken) => {
    if (currentToken) {
      try {
        const response = await userService.getUserProfile(currentToken);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data)); // Update user in localStorage
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        // Potentially logout if token is invalid
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          logout(); // Call logout if token is invalid or expired
        } else {
          setError('Could not load user profile.');
        }
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken); // Fetch profile on initial load if token exists
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { access_token } = response.data;
      setToken(access_token);
      localStorage.setItem('token', access_token);
      await fetchUserProfile(access_token); // Fetch profile after login
      router.push('/dashboard'); // Redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
      setLoading(false); // Ensure loading is set to false on error
      throw err;
    }
    setLoading(false);
  };

  const signup = async (email, password, fullName) => {
    setLoading(true);
    setError(null);
    try {
      await authService.signup(email, password, fullName);
      // After signup, redirect to login, user will fetch profile upon successful login
      router.push('/auth/login'); 
    } catch (err) {
      setError(err.response?.data?.detail || 'Signup failed. Please try again.');
      setLoading(false); // Ensure loading is set to false on error
      throw err;
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };
  
  const updateUserContextProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, signup, logout, setError, setLoading, fetchUserProfile, updateUserContextProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
