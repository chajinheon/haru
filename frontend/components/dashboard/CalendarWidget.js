import React, { useMemo } from 'react';
import WidgetCard from './WidgetCard';
import Link from 'next/link';
import { useTodos } from '../../context/TodoContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import koLocale from '@fullcalendar/core/locales/ko';
import styles from './CalendarWidget.module.css'; // Create this CSS module

const CalendarWidget = () => {
  const { todos, loading, error } = useTodos();

  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0]; // YYYY-MM-DD for comparison

  const calendarEvents = useMemo(() => {
    if (!todos) return [];
    return todos
      .filter(todo => todo.due_date)
      .map(todo => ({
        date: todo.due_date,
        display: 'background',
        backgroundColor: todo.is_completed ? '#D1FAE5' : '#FFF9C4', // Light green for completed, Light yellow for pending
      }));
  }, [todos]);

  const todaysDueTodos = useMemo(() => {
    if (!todos) return [];
    return todos
      .filter(todo => {
        if (!todo.due_date) return false;
        try {
          return todo.due_date.startsWith(todayDateString);
        } catch (e) {
          console.error("Error parsing due_date for todo:", todo, e);
          return false;
        }
      })
      .slice(0, 3); // Max 3 items
  }, [todos, todayDateString]);

  let calendarContent;
  let todoListContent;

  if (loading) {
    calendarContent = <p className={styles.loadingText}>오늘 일정 로딩 중...</p>;
    todoListContent = null; // Or a specific loading state for the list
  } else if (error) {
    calendarContent = <p className={styles.errorText}>일정을 불러오는 중 오류가 발생했습니다.</p>;
    todoListContent = null;
  } else {
    calendarContent = (
      <div className={styles.calendarContainer}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false} // No header
          height="280px"
          locale={koLocale}
          dayCellDidMount={(arg) => {
            if (arg.date.toISOString().split('T')[0] === todayDateString) {
              arg.el.classList.add('fc-today-highlight');
            }
          }}
          events={calendarEvents}
          eventDisplay="background" // Ensures events are rendered as background
        />
      </div>
    );

    if (todaysDueTodos.length === 0) {
      todoListContent = <p className={styles.noTasksText}>오늘 예정된 할 일이 없습니다.</p>;
    } else {
      todoListContent = (
        <ul className={styles.dueTodoList}>
          {todaysDueTodos.map(todo => (
            <li key={todo.id} className={styles.dueTodoItem}>
              <span className={todo.is_completed ? styles.completedTask : styles.pendingTask}>
                {todo.is_completed ? '✅' : '⏳'}
              </span>
              <span className={styles.taskTitle}>{todo.title}</span>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <WidgetCard title="미니 캘린더">
      {calendarContent}
      <div className={styles.todoListSection}>
        <h4 className={styles.todoListHeader}>오늘 마감</h4>
        {todoListContent}
      </div>
      <div className={styles.widgetFooter}>
        <Link href="/calendar">전체 캘린더 보기</Link>
      </div>
    </WidgetCard>
  );
};

export default CalendarWidget;
