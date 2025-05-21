import React from 'react';
import WidgetCard from './WidgetCard';
import Link from 'next/link';
import { useJournal } from '../../context/JournalContext'; // Corrected import path
import styles from './RecentJournalWidget.module.css'; // Create this file for specific styles

const RecentJournalWidget = () => {
  const { entries, loading, error } = useJournal();

  let content;
  if (loading) {
    content = <p>최근 일지 로딩 중...</p>;
  } else if (error) {
    content = <p>일지를 불러오는 중 오류가 발생했습니다: {error}</p>;
  } else if (!entries || entries.length === 0) {
    content = <p>작성된 일지가 없습니다.</p>;
  } else {
    const recentEntry = entries[0]; // Already sorted by date descending in context
    const formattedDate = new Date(recentEntry.date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    content = (
      <div className={styles.journalContent}>
        <h4 className={styles.journalTitle}>{recentEntry.title || '무제 일지'}</h4>
        <p className={styles.journalDate}>{formattedDate}</p>
        <p className={styles.journalPreview}>
          {recentEntry.content.substring(0, 100)}
          {recentEntry.content.length > 100 ? '...' : ''}
        </p>
      </div>
    );
  }

  return (
    <WidgetCard title="최근 일지">
      {content}
      <div className={styles.widgetFooter}>
        <Link href="/journal">전체 일지 보기</Link>
      </div>
    </WidgetCard>
  );
};

export default RecentJournalWidget;
