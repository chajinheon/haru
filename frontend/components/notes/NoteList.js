import React from 'react';
import NoteItem from './NoteItem';
import styles from '../../styles/NoteList.module.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  if (!notes || notes.length === 0) {
    return <p className={styles.emptyMessage}>아직 작성된 노트가 없습니다. 새 노트를 작성해보세요!</p>;
  }

  return (
    <ul className={styles.noteList}>
      {notes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
};

export default NoteList;
