import React, { useContext, useMemo } from 'react';
import WidgetCard from './WidgetCard';
import Link from 'next/link';
import { useTodos } from '../../context/TodoContext'; // Corrected import path
import styles from './TodoListWidget.module.css'; // Create this file for specific styles

const TodoListWidget = () => {
  const { todos, loading, error, toggleTodoComplete } = useTodos();

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for comparison

  const todaysTodos = useMemo(() => {
    if (!todos) return [];
    return todos
      .filter(todo => {
        if (!todo.due_date || todo.is_completed) return false;
        try {
          const dueDate = new Date(todo.due_date);
          dueDate.setHours(0, 0, 0, 0); // Normalize due date
          return dueDate.getTime() === today.getTime();
        } catch (e) {
          console.error("Error parsing due_date for todo:", todo, e);
          return false;
        }
      })
      .slice(0, 5);
  }, [todos, today]); // today is included as a dependency, though it only changes daily

  const handleToggle = async (todoId, currentStatus) => {
    try {
      await toggleTodoComplete(todoId, currentStatus);
      // No need to manually refetch or re-filter, context update should trigger re-render
    } catch (err) {
      console.error("Error toggling todo in widget:", err);
      // Optionally show a small error message within the widget
    }
  };

  let content;
  if (loading) {
    content = <p>오늘의 할 일 로딩 중...</p>;
  } else if (error) {
    content = <p>할 일을 불러오는 중 오류가 발생했습니다: {error}</p>;
  } else if (todaysTodos.length === 0) {
    content = <p>오늘 마감인 할 일이 없습니다.</p>;
  } else {
    content = (
      <ul className={styles.todoList}>
        {todaysTodos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => handleToggle(todo.id, todo.is_completed)}
              className={styles.checkbox}
            />
            <span className={todo.is_completed ? styles.completedTitle : styles.title}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <WidgetCard title="오늘의 할 일">
      {content}
      <div className={styles.widgetFooter}>
        <Link href="/todos">전체 할 일 보기</Link>
      </div>
    </WidgetCard>
  );
};

export default TodoListWidget;
