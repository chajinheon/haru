import React from 'react';
import styles from '../../styles/NoteItem.module.css';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      console.error("Error formatting timestamp:", e, "Timestamp:", timestamp);
      return 'Invalid Date';
    }
  };

  return (
    <li className={styles.noteItem}>
      <div className={styles.itemHeader}>
        <h4 className={styles.title}>{note.title || '무제 노트'}</h4>
        <span className={styles.date}>
          최종 수정: {formatTimestamp(note.updated_at)}
        </span>
      </div>
      <p className={styles.contentPreview}>
        {note.content.substring(0, 100)}{note.content.length > 100 ? '...' : ''}
      </p>
      {note.tags && note.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {note.tags.map((tag, index) => (
            <span key={index} className={styles.tagChip}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className={styles.itemActions}>
        <button onClick={() => onEdit(note)} className={styles.editButton}>수정</button>
        <button onClick={() => onDelete(note.id)} className={styles.deleteButton}>삭제</button>
      </div>
    </li>
  );
};

export default NoteItem;
