import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import aiService from '../services/aiService';
import { useAuth } from './AuthContext'; // Renamed from useContext for clarity if needed, but useAuth is fine

const AIFeedbackContext = createContext();

export const useAIFeedback = () => useContext(AIFeedbackContext);

export const AIFeedbackProvider = ({ children }) => {
  const [latestDailySummary, setLatestDailySummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get token from AuthContext

  const fetchLatestDailySummary = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.getLatestDailySummary(token);
      setLatestDailySummary(data); // data can be null if no feedback
    } catch (err) {
      console.error("Error fetching latest daily summary:", err);
      setError(err.response?.data?.detail || 'Failed to fetch latest daily summary.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const generateNewDailySummary = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await aiService.requestDailySummary(token);
      setLatestDailySummary(data);
    } catch (err) {
      console.error("Error generating new daily summary:", err);
      setError(err.response?.data?.detail || 'Failed to generate new daily summary.');
      throw err; // Re-throw for component to handle if needed
    } finally {
      setLoading(false);
    }
  }, [token]);

  return (
    <AIFeedbackContext.Provider 
      value={{ 
        latestDailySummary, 
        loading, 
        error, 
        fetchLatestDailySummary, 
        generateNewDailySummary,
        setError 
      }}
    >
      {children}
    </AIFeedbackContext.Provider>
  );
};
