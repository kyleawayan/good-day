import React from 'react';
import styles from '../../styles/EventBlock.module.css';

type EventBlockProps = {
  event: PlannerItem;
};

export default function EventBlock({ event }: EventBlockProps) {
  let startHour = 0;
  if (event.plannable.start_at) {
    startHour = new Date(event.plannable.start_at).getHours();
  } else if (event.plannable.due_at) {
    startHour = new Date(event.plannable.due_at).getHours();
  }
  return (
    <div style={{ top: startHour * 200 }} className={styles.eventBlock}>
      {event.plannable.title}
    </div>
  );
}
