import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import noteService from '../services/noteService';
import { useAuth } from './AuthContext'; // To get the token

const NoteContext = createContext();

export const useNotes = () => useContext(NoteContext);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth(); // Get token from AuthContext

  const sortNotes = (notesArray) => {
    return notesArray.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  };

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await noteService.getNotes(token);
      setNotes(sortNotes(response.data || []));
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError(err.response?.data?.detail || 'Failed to fetch notes.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addNote = async (noteData) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await noteService.createNote(token, noteData);
      setNotes(prevNotes => sortNotes([...prevNotes, response.data]));
    } catch (err) {
      console.error("Error adding note:", err);
      setError(err.response?.data?.detail || 'Failed to add note.');
      throw err; // Re-throw to allow form to handle error
    } finally {
      setLoading(false);
    }
  };

  const editNote = async (noteId, noteData) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await noteService.updateNote(token, noteId, noteData);
      setNotes(prevNotes =>
        sortNotes(prevNotes.map(note => (note.id === noteId ? response.data : note)))
      );
    } catch (err) {
      console.error("Error editing note:", err);
      setError(err.response?.data?.detail || 'Failed to edit note.');
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  const removeNote = async (noteId) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await noteService.deleteNote(token, noteId);
      setNotes(prevNotes => sortNotes(prevNotes.filter(note => note.id !== noteId)));
    } catch (err) {
      console.error("Error removing note:", err);
      setError(err.response?.data?.detail || 'Failed to remove note.');
      throw err; // Re-throw
    } finally {
      setLoading(false);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, loading, error, fetchNotes, addNote, editNote, removeNote, setError }}>
      {children}
    </NoteContext.Provider>
  );
};
