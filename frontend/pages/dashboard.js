import React from 'react';
import PrivateRoute from '../components/PrivateRoute';
import Navbar from '../components/Navbar';
import styles from '../styles/DashboardPage.module.css';

// Import Widget Components
import TodaySummaryWidget from '../components/dashboard/TodaySummaryWidget';
import TodoListWidget from '../components/dashboard/TodoListWidget';
import CalendarWidget from '../components/dashboard/CalendarWidget';
import RecentJournalWidget from '../components/dashboard/RecentJournalWidget';
import EmotionTrackerWidget from '../components/dashboard/EmotionTrackerWidget';
import GrowthChartWidget from '../components/dashboard/GrowthChartWidget';

const DashboardPage = () => {
  return (
    <PrivateRoute>
      <Navbar />
      <div className={`container ${styles.dashboardContainer}`}>
        <h1>나의 하루 대시보드</h1>
        <div className={styles.dashboardGrid}>
          <div className={`${styles.gridItem} ${styles.gridItemSpan2}`}> {/* Span 2 columns for summary */}
            <TodaySummaryWidget />
          </div>
          <div className={styles.gridItem}>
            <TodoListWidget />
          </div>
          <div className={styles.gridItem}>
            <CalendarWidget />
          </div>
          <div className={styles.gridItem}>
            <RecentJournalWidget />
          </div>
          <div className={styles.gridItem}>
            <EmotionTrackerWidget />
          </div>
          <div className={`${styles.gridItem} ${styles.gridItemSpan2}`}> {/* Span 2 columns for chart */}
            <GrowthChartWidget />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default DashboardPage;
