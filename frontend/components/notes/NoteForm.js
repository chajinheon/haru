import React, { useState, useEffect } from 'react';
import styles from '../../styles/NoteForm.module.css';

const NoteForm = ({ initialData, onSave, onCancel, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState(''); // Comma-separated string

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setTags(initialData.tags ? initialData.tags.join(', ') : '');
    } else {
      // Reset form for new entry
      setTitle('');
      setContent('');
      setTags('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert('내용은 필수 항목입니다.');
      return;
    }

    const noteData = {
      title: title.trim() || null, // Send null if title is empty or just whitespace
      content: content.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // Split, trim, and filter empty tags
    };
    onSave(noteData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.noteForm}>
      <h3>{initialData ? '노트 수정' : '새 노트 작성'}</h3>
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
          rows={8}
          className={styles.textarea}
        />
      </div>
      <div>
        <label htmlFor="tags">태그 (쉼표로 구분)</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="예: 아이디어, 프로젝트, 중요"
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

export default NoteForm;
