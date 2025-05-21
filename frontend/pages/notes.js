import React, { useEffect, useState } from 'react';
import { useNotes } from '../context/NoteContext';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import NoteList from '../components/notes/NoteList';
import NoteForm from '../components/notes/NoteForm';
import styles from '../styles/NotesPage.module.css';

const NotesPage = () => {
  const { notes, loading, error, fetchNotes, addNote, editNote, removeNote, setError } = useNotes();
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null); // Note object for editing

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleOpenFormForCreate = () => {
    setEditingNote(null); // Clear any editing state
    setShowForm(true);
    setError(null); // Clear previous errors when opening form
  };

  const handleOpenFormForEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
    setError(null); // Clear previous errors
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
    setError(null); // Also clear errors when explicitly closing
  };

  const handleSaveNote = async (noteData) => {
    setError(null);
    try {
      if (editingNote) {
        await editNote(editingNote.id, noteData);
      } else {
        await addNote(noteData);
      }
      handleCloseForm(); // Close form on successful save
    } catch (err) {
      // Error is set in NoteContext
      console.error("Failed to save note from page:", err);
      // Form remains open for user to correct if needed
    }
  };

  const handleDeleteNote = async (noteId) => {
    // Confirmation is handled in NoteItem or could be here if preferred
    setError(null);
    try {
      await removeNote(noteId);
    } catch (err) {
      // Error is set in NoteContext
      console.error("Failed to delete note from page:", err);
    }
  };
  
  return (
    <PrivateRoute>
      <Navbar />
      <div className={`container ${styles.notesContainer}`}>
        <h1>나의 노트</h1>

        {error && <p className={`error-message ${styles.pageError}`}>{error}</p>}

        <button onClick={handleOpenFormForCreate} className={styles.addNoteButton}>
          새 노트 작성
        </button>

        {showForm && (
          <div className={styles.formModal}> {/* Using modal style for form */}
            <div className={styles.formModalContent}>
              <NoteForm
                initialData={editingNote}
                onSave={handleSaveNote}
                onCancel={handleCloseForm}
                loading={loading} // Use context's loading for form as well
              />
            </div>
          </div>
        )}
        
        {loading && notes.length === 0 && <p>노트 목록을 불러오는 중...</p>}
        
        <NoteList 
            notes={notes} 
            onEdit={handleOpenFormForEdit} 
            onDelete={handleDeleteNote} 
        />
      </div>
    </PrivateRoute>
  );
};

export default NotesPage;
