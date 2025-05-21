import React from 'react';
import WidgetCard from './WidgetCard';

const EmotionTrackerWidget = () => {
  return (
    <WidgetCard title="감정 기록 (준비 중)">
      <p>감정을 기록하고 변화를 추적하는 공간입니다.</p>
      <button disabled>감정 기록하기</button>
    </WidgetCard>
  );
};

export default EmotionTrackerWidget;
