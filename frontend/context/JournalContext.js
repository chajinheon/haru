import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import journalService from '../services/journalService';
import { useAuth } from './AuthContext'; // To get the token

const JournalContext = createContext();

export const useJournal = () => useContext(JournalContext);

export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get token from AuthContext

  const sortEntries = (entriesArray) => {
    return entriesArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const fetchEntries = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await journalService.getJournalEntries(token);
      setEntries(sortEntries(response.data || []));
    } catch (err) {
      console.error("Error fetching journal entries:", err);
      setError(err.response?.data?.detail || 'Failed to fetch journal entries.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addEntry = async (entryData) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await journalService.createJournalEntry(token, entryData);
      setEntries(prevEntries => sortEntries([...prevEntries, response.data]));
    } catch (err) {
      console.error("Error adding journal entry:", err);
      setError(err.response?.data?.detail || 'Failed to add journal entry.');
      throw err; // Re-throw to allow form to handle error
    } finally {
      setLoading(false);
    }
  };

  const editEntry = async (entryId, entryData) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await journalService.updateJournalEntry(token, entryId, entryData);
      setEntries(prevEntries =>
        sortEntries(prevEntries.map(entry => (entry.id === entryId ? response.data : entry)))
      );
    } catch (err) {
      console.error("Error editing journal entry:", err);
      setError(err.response?.data?.detail || 'Failed to edit journal entry.');
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  const removeEntry = async (entryId) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await journalService.deleteJournalEntry(token, entryId);
      setEntries(prevEntries => sortEntries(prevEntries.filter(entry => entry.id !== entryId)));
    } catch (err) {
      console.error("Error removing journal entry:", err);
      setError(err.response?.data?.detail || 'Failed to remove journal entry.');
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  return (
    <JournalContext.Provider value={{ entries, loading, error, fetchEntries, addEntry, editEntry, removeEntry, setError }}>
      {children}
    </JournalContext.Provider>
  );
};
