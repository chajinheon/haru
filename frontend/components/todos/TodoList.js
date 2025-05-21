import React from 'react';
import TodoItem from './TodoItem';
import styles from '../../styles/TodoList.module.css';

const TodoList = ({ todos, onEdit }) => {
  if (!todos || todos.length === 0) {
    return <p className={styles.emptyMessage}>아직 할 일이 없습니다. 새 할 일을 추가해보세요!</p>;
  }

  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TodoList;
