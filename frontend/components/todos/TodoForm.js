import React, { useState, useEffect } from 'react';
import styles from '../../styles/TodoForm.module.css';

const TodoForm = ({ initialData, onSave, onCancel, loading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(3); // Default priority
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDueDate(initialData.due_date ? initialData.due_date.substring(0, 10) : ''); // Format for date input
      setPriority(initialData.priority || 3);
      setCategory(initialData.category || '');
    } else {
      // Reset form for new entry
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority(3);
      setCategory('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    const todoData = {
      title,
      description,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
      priority: parseInt(priority, 10),
      category,
      // is_completed is not handled here, usually set on creation or by toggle
    };
    if (initialData && initialData.is_completed !== undefined) {
      todoData.is_completed = initialData.is_completed;
    }
    onSave(todoData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <h3>{initialData ? '할 일 수정' : '새 할 일 추가'}</h3>
      <div>
        <label htmlFor="title">제목*</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <div>
        <label htmlFor="dueDate">마감일</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.input}
        />
      </div>
      <div>
        <label htmlFor="priority">우선순위</label>
        <select 
          id="priority" 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          className={styles.select}
        >
          <option value={1}>높음</option>
          <option value={2}>중간</option>
          <option value={3}>낮음</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">카테고리</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="예: 업무, 개인"
          className={styles.input}
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" disabled={loading} className={styles.saveButton}>
          {loading ? '저장 중...' : (initialData ? '수정하기' : '추가하기')}
        </button>
        {onCancel && <button type="button" onClick={onCancel} disabled={loading} className={styles.cancelButton}>취소</button>}
      </div>
    </form>
  );
};

export default TodoForm;
