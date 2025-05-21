import React, { useState, useEffect } from 'react';
import styles from '../../styles/JournalForm.module.css';

const JournalForm = ({ initialData, onSave, onCancel, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10)); // Default to today
  const [mood, setMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState(''); // Storing as string for input, will parse to int
  const [satisfactionLevel, setSatisfactionLevel] = useState(''); // Storing as string

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setDate(initialData.date ? new Date(initialData.date).toISOString().substring(0, 10) : new Date().toISOString().substring(0, 10));
      setMood(initialData.mood || '');
      setEnergyLevel(initialData.energy_level !== null && initialData.energy_level !== undefined ? String(initialData.energy_level) : '');
      setSatisfactionLevel(initialData.satisfaction_level !== null && initialData.satisfaction_level !== undefined ? String(initialData.satisfaction_level) : '');
    } else {
      // Reset form for new entry
      setTitle('');
      setContent('');
      setDate(new Date().toISOString().substring(0, 10));
      setMood('');
      setEnergyLevel('');
      setSatisfactionLevel('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('내용은 필수 항목입니다.');
      return;
    }
    if(!date){
        alert('날짜는 필수 항목입니다.');
        return;
    }

    const entryData = {
      title,
      content,
      date, // Already in 'YYYY-MM-DD' format
      mood: mood || null, // Send null if empty
      energy_level: energyLevel ? parseInt(energyLevel, 10) : null,
      satisfaction_level: satisfactionLevel ? parseInt(satisfactionLevel, 10) : null,
    };
    onSave(entryData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.journalForm}>
      <h3>{initialData ? '일지 수정' : '새 일지 작성'}</h3>
      <div>
        <label htmlFor="date">날짜*</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="content">내용*</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          className={styles.textarea}
        />
      </div>
      <div>
        <label htmlFor="mood">오늘의 기분</label>
        <input
          type="text"
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="예: 행복함, 보통, 스트레스 받음"
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="energyLevel">에너지 레벨 (1-5)</label>
        <input
          type="number"
          id="energyLevel"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(e.target.value)}
          min="1"
          max="5"
          placeholder="1(매우 낮음) - 5(매우 높음)"
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="satisfactionLevel">만족도 레벨 (1-5)</label>
        <input
          type="number"
          id="satisfactionLevel"
          value={satisfactionLevel}
          onChange={(e) => setSatisfactionLevel(e.target.value)}
          min="1"
          max="5"
          placeholder="1(매우 불만족) - 5(매우 만족)"
          className={styles.input}
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" disabled={loading} className={styles.saveButton}>
          {loading ? '저장 중...' : (initialData ? '수정하기' : '작성하기')}
        </button>
        {onCancel && <button type="button" onClick={onCancel} disabled={loading} className={styles.cancelButton}>취소</button>}
      </div>
    </form>
  );
};

export default JournalForm;
