import React, { useEffect, useMemo } from 'react';
import { useTodos } from '../context/TodoContext';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import CalendarView from '../components/calendar/CalendarView';
import styles from '../styles/CalendarPage.module.css'; // For page-specific styling

const CalendarPage = () => {
  const { todos, loading: todosLoading, error: todosError, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts or fetchTodos changes
  }, [fetchTodos]);

  const calendarEvents = useMemo(() => {
    return todos
      .filter(todo => todo.due_date) // Only use todos that have a due_date
      .map(todo => ({
        id: String(todo.id),
        title: todo.title,
        start: todo.due_date, // FullCalendar can parse ISO strings
        allDay: true, // Assume all-day events for simplicity, adjust if time is relevant
        className: todo.is_completed ? 'fc-event-completed' : '',
        backgroundColor: todo.is_completed ? '#28a745' : '#007bff', // Green for completed, Blue for pending
        borderColor: todo.is_completed ? '#1e7e34' : '#0056b3',
        extendedProps: {
          description: todo.description,
          category: todo.category,
          priority: todo.priority,
          // You can add other todo properties here if needed for eventClick or eventContent
        },
      }));
  }, [todos]);

  const handleEventClick = (clickInfo) => {
    // Example: Log to console or open a modal with event details
    console.log('Event clicked:', clickInfo.event);
    alert(
      `할 일: ${clickInfo.event.title}\n` +
      `상태: ${clickInfo.event.extendedProps.is_completed ? '완료됨' : '진행 중'}\n` +
      `마감일: ${new Date(clickInfo.event.startStr).toLocaleDateString('ko-KR')}\n` +
      (clickInfo.event.extendedProps.description ? `설명: ${clickInfo.event.extendedProps.description}\n` : '') +
      `ID: ${clickInfo.event.id}`
    );
    // To navigate to the todo edit page, you might do something like:
    // router.push(`/todos?edit=${clickInfo.event.id}`);
    // This would require the todos page to handle such a query parameter.
  };

  const handleDateClick = (arg) => {
    console.log('Date clicked:', arg.dateStr);
    // Example: Open a modal to create a new todo for this date
    // You could pass arg.dateStr to a TodoForm
    alert(`선택된 날짜: ${arg.dateStr}\n이 날짜에 새 할 일을 추가할 수 있습니다.`);
  };

  return (
    <PrivateRoute>
      <Navbar />
      <div className={`container ${styles.calendarPageContainer}`}>
        <h1>나의 캘린더</h1>
        {todosLoading && <p>캘린더 이벤트를 불러오는 중...</p>}
        {todosError && <p className="error-message">{todosError}</p>}
        
        <div className={styles.calendarWrapper}>
          <CalendarView 
            events={calendarEvents}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
          />
        </div>
      </div>
    </PrivateRoute>
  );
};

export default CalendarPage;
