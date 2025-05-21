import React, { useEffect, useState } from 'react';
import { useJournal } from '../context/JournalContext';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import JournalList from '../components/journal/JournalList';
import JournalForm from '../components/journal/JournalForm';
import styles from '../styles/JournalPage.module.css';

const JournalPage = () => {
  const { entries, loading, error, fetchEntries, addEntry, editEntry, removeEntry, setError } = useJournal();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null); // JournalEntry object for editing

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const handleOpenFormForCreate = () => {
    setEditingEntry(null); // Clear any editing state
    setShowForm(true);
    setError(null); // Clear previous errors when opening form
  };

  const handleOpenFormForEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
    setError(null); // Clear previous errors
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEntry(null);
    setError(null); // Also clear errors when explicitly closing
  };

  const handleSaveEntry = async (entryData) => {
    setError(null);
    try {
      if (editingEntry) {
        await editEntry(editingEntry.id, entryData);
      } else {
        await addEntry(entryData);
      }
      handleCloseForm(); // Close form on successful save
    } catch (err) {
      // Error is set in JournalContext
      console.error("Failed to save journal entry from page:", err);
      // Form remains open for user to correct if needed
    }
  };

  const handleDeleteEntry = async (entryId) => {
    // Confirmation is handled in JournalItem or could be here
    setError(null);
    try {
      await removeEntry(entryId);
    } catch (err) {
      // Error is set in JournalContext
      console.error("Failed to delete journal entry from page:", err);
    }
  };
  
  return (
    <PrivateRoute>
      <Navbar />
      <div className={`container ${styles.journalContainer}`}>
        <h1>나의 일지</h1>

        {error && <p className={`error-message ${styles.pageError}`}>{error}</p>}

        <button onClick={handleOpenFormForCreate} className={styles.addEntryButton}>
          새 일지 작성
        </button>

        {showForm && (
          <div className={styles.formModal}> {/* Using modal style for form */}
            <div className={styles.formModalContent}>
              <JournalForm
                initialData={editingEntry}
                onSave={handleSaveEntry}
                onCancel={handleCloseForm}
                loading={loading} // Use context's loading for form as well
              />
            </div>
          </div>
        )}
        
        {loading && entries.length === 0 && <p>일지 목록을 불러오는 중...</p>}
        
        <JournalList 
            entries={entries} 
            onEdit={handleOpenFormForEdit} 
            onDelete={handleDeleteEntry} 
        />
      </div>
    </PrivateRoute>
  );
};

export default JournalPage;
