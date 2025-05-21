import React from 'react';
import JournalItem from './JournalItem';
import styles from '../../styles/JournalList.module.css';

const JournalList = ({ entries, onEdit, onDelete }) => {
  if (!entries || entries.length === 0) {
    return <p className={styles.emptyMessage}>아직 작성된 일지가 없습니다. 새 일지를 작성해보세요!</p>;
  }

  return (
    <ul className={styles.journalList}>
      {entries.map(entry => (
        <JournalItem 
          key={entry.id} 
          entry={entry} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
};

export default JournalList;
