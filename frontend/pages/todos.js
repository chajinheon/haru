import React, { useEffect, useState } from 'react';
import { TodoProvider, useTodos } from '../context/TodoContext';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import TodoList from '../components/todos/TodoList';
import TodoForm from '../components/todos/TodoForm';
import styles from '../styles/TodosPage.module.css';

// Inner component that uses TodoContext
const TodosPageContent = () => {
  const { todos, loading, error, fetchTodos, addTodo, editTodo, setError } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null); // Todo object for editing

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleOpenFormForCreate = () => {
    setEditingTodo(null); // Clear any editing state
    setShowForm(true);
    setError(null); // Clear previous errors when opening form
  };

  const handleOpenFormForEdit = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
    setError(null); // Clear previous errors
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTodo(null);
    setError(null); // Also clear errors when explicitly closing
  };

  const handleSaveTodo = async (todoData) => {
    setError(null);
    try {
      if (editingTodo) {
        await editTodo(editingTodo.id, todoData);
      } else {
        await addTodo(todoData);
      }
      handleCloseForm(); // Close form on successful save
    } catch (err) {
      // Error is set in TodoContext, TodoForm can also display it if passed
      console.error("Failed to save todo from page:", err);
      // Form remains open for user to correct
    }
  };

  return (
    <>
      <Navbar />
      <div className={`container ${styles.todosContainer}`}>
        <h1>나의 할 일 목록</h1>

        {error && <p className={`error-message ${styles.pageError}`}>{error}</p>}

        <button onClick={handleOpenFormForCreate} className={styles.addTodoButton}>
          새 할 일 추가
        </button>

        {showForm && (
          <div className={styles.formModal}>
            <div className={styles.formModalContent}>
              <TodoForm
                initialData={editingTodo}
                onSave={handleSaveTodo}
                onCancel={handleCloseForm}
                loading={loading} // Use context's loading for form as well
              />
            </div>
          </div>
        )}
        
        {loading && todos.length === 0 && <p>할 일 목록을 불러오는 중...</p>}
        
        <TodoList todos={todos} onEdit={handleOpenFormForEdit} />
      </div>
    </>
  );
};

// Main page component that wraps content with Providers
const TodosPage = () => {
  return (
    <PrivateRoute>
      <TodoProvider> {/* TodoProvider wraps the content that needs access to todo context */}
        <TodosPageContent />
      </TodoProvider>
    </PrivateRoute>
  );
};

export default TodosPage;
