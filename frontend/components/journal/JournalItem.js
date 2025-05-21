import React from 'react';
import styles from '../../styles/JournalItem.module.css';

const JournalItem = ({ entry, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      // Adjust for timezone offset if dates are stored as UTC but should be displayed as local
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      const localDate = new Date(date.getTime() + userTimezoneOffset); // Use this if dates are UTC and need local conversion
      return localDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      console.error("Error formatting date:", e, "Date string:", dateString);
      return 'Invalid Date';
    }
  };

  const getMoodEmoji = (mood) => {
    if (!mood) return '';
    if (mood.includes('행복') || mood.includes('happy')) return '😄';
    if (mood.includes('슬픔') || mood.includes('sad')) return '😢';
    if (mood.includes('화남') || mood.includes('angry')) return '😠';
    if (mood.includes('스트레스') || mood.includes('stressed')) return '😥';
    if (mood.includes('보통') || mood.includes('normal')) return '😐';
    return '📝'; // Default icon if no specific mood emoji
  };

  return (
    <li className={styles.journalItem}>
      <div className={styles.itemHeader}>
        <h4 className={styles.title}>{entry.title || '무제'}</h4>
        <span className={styles.date}>{formatDate(entry.date)}</span>
      </div>
      <p className={styles.contentPreview}>
        {entry.content.substring(0, 150)}{entry.content.length > 150 ? '...' : ''}
      </p>
      <div className={styles.itemFooter}>
        {entry.mood && (
          <span className={styles.mood}>
            기분: {getMoodEmoji(entry.mood)} {entry.mood}
          </span>
        )}
        {entry.energy_level !== null && (
          <span className={styles.energy}>
            에너지: {'⚡️'.repeat(entry.energy_level)} ({entry.energy_level}/5)
          </span>
        )}
        {entry.satisfaction_level !== null && (
          <span className={styles.satisfaction}>
            만족도: {'⭐'.repeat(entry.satisfaction_level)} ({entry.satisfaction_level}/5)
          </span>
        )}
      </div>
      <div className={styles.itemActions}>
        <button onClick={() => onEdit(entry)} className={styles.editButton}>수정</button>
        <button onClick={() => onDelete(entry.id)} className={styles.deleteButton}>삭제</button>
      </div>
    </li>
  );
};

export default JournalItem;
