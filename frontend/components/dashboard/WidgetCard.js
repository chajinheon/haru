import React from 'react';
import styles from './WidgetCard.module.css';

const WidgetCard = ({ title, children }) => {
  return (
    <div className={styles.widgetCard}>
      {title && <h3 className={styles.widgetTitle}>{title}</h3>}
      <div className={styles.widgetContent}>
        {children}
      </div>
    </div>
  );
};

export default WidgetCard;
