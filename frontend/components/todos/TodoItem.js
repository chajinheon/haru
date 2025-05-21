import React from 'react';
import { useTodos } from '../../context/TodoContext'; // To call toggleComplete and removeTodo directly
import styles from '../../styles/TodoItem.module.css';

const TodoItem = ({ todo, onEdit }) => {
  const { toggleTodoComplete, removeTodo, loading, setError } = useTodos();

  const handleToggleComplete = async () => {
    setError(null);
    try {
      await toggleTodoComplete(todo.id, todo.is_completed);
    } catch (err) {
      // Error is set in context, or you can set a specific item error here
      console.error("Failed to toggle complete on item:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`'${todo.title}' 할 일을 삭제하시겠습니까?`)) {
      setError(null);
      try {
        await removeTodo(todo.id);
      } catch (err) {
        // Error is set in context
        console.error("Failed to delete item:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const getPriorityText = (priorityValue) => {
    switch (priorityValue) {
      case 1: return '높음';
      case 2: return '중간';
      case 3: return '낮음';
      default: return '미지정';
    }
  };

  return (
    <li className={`${styles.todoItem} ${todo.is_completed ? styles.completed : ''}`}>
      <div className={styles.itemHeader}>
        <input
          type="checkbox"
          checked={todo.is_completed}
          onChange={handleToggleComplete}
          disabled={loading}
          className={styles.checkbox}
        />
        <h4 className={styles.title}>{todo.title}</h4>
      </div>
      {todo.description && <p className={styles.description}>{todo.description}</p>}
      <div className={styles.itemDetails}>
        <span className={styles.detailItem}><strong>마감일:</strong> {formatDate(todo.due_date)}</span>
        <span className={styles.detailItem}><strong>우선순위:</strong> {getPriorityText(todo.priority)}</span>
        {todo.category && <span className={styles.detailItem}><strong>카테고리:</strong> {todo.category}</span>}
      </div>
      <div className={styles.itemActions}>
        <button onClick={() => onEdit(todo)} disabled={loading} className={styles.editButton}>수정</button>
        <button onClick={handleDelete} disabled={loading} className={styles.deleteButton}>삭제</button>
      </div>
    </li>
  );
};

export default TodoItem;
