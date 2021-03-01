import React from 'react';
import styles from '../../styles/Event.module.css';

type EventProps = {
  event: PlannerItem;
};

export default function Event({ event }: EventProps) {
  return (
    <div className={styles.event}>
      <div className={styles.time}>
        {new Date(event.plannable_date).toLocaleTimeString()}
      </div>
      <div className={styles.title}>{event.plannable.title}</div>
      <div className={styles.course}>{event.context_name}</div>
    </div>
  );
}
