import React, { useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { useAIFeedback } from '../../context/AIFeedbackContext';
import { useAuth } from '../../context/AuthContext'; // To get token for initial fetch trigger
import styles from './TodaySummaryWidget.module.css';

const TodaySummaryWidget = () => {
  const { 
    latestDailySummary, 
    loading, 
    error, 
    fetchLatestDailySummary, 
    generateNewDailySummary,
    setError // To clear error if needed
  } = useAIFeedback();
  
  const { token } = useAuth(); // Get token to ensure it's available before fetching

  useEffect(() => {
    if (token) { // Only fetch if token is available
      fetchLatestDailySummary();
    }
    // Clear previous errors when component mounts
    // setError(null); // Decided against this to see persistent errors until action
  }, [fetchLatestDailySummary, token]); // Add token as dependency

  const handleGenerateSummary = async () => {
    setError(null); // Clear previous errors before new request
    try {
      await generateNewDailySummary();
    } catch (err) {
      // Error is already set in context by generateNewDailySummary
      console.error("Failed to generate new summary from widget:", err);
    }
  };

  let content;
  if (loading && !latestDailySummary && !error) { // Show loading only if no summary and no error yet
    content = <p className={styles.loadingText}>AI 코멘트 로딩 중...</p>;
  } else if (error) {
    content = <p className={styles.errorText}>Error: {error}</p>;
  } else if (latestDailySummary) {
    content = (
      <div className={styles.summaryContent}>
        <p>{latestDailySummary.content}</p>
        <small className={styles.timestamp}>
          생성일: {new Date(latestDailySummary.created_at).toLocaleString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </small>
      </div>
    );
  } else { // No summary, not loading, no error
    content = <p className={styles.noSummaryText}>오늘의 AI 코멘트가 아직 없습니다.</p>;
  }

  return (
    <WidgetCard title="AI 데일리 코멘트">
      {content}
      <button 
        onClick={handleGenerateSummary} 
        disabled={loading} 
        className={styles.actionButton}
      >
        {loading ? '코멘트 생성 중...' : '새 코멘트 받기'}
      </button>
    </WidgetCard>
  );
};

export default TodaySummaryWidget;
