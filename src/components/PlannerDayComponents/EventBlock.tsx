import React from 'react';
import styles from '../../styles/EventBlock.module.css';

type EventBlockProps = {
  event: PlannerItem;
};

export default function EventBlock({ event }: EventBlockProps) {
  let startHour = 0;
  let eventHeight = 50;
  if (event.plannable.start_at) {
    startHour = new Date(event.plannable.start_at).getHours();
    if (event.plannable.end_at) {
      const durationHoursDecimal =
        (new Date(event.plannable.end_at).getTime() -
          new Date(event.plannable.start_at).getTime()) /
        60000 /
        60;
      eventHeight = 200 * durationHoursDecimal;
    }
  } else if (event.plannable.due_at) {
    startHour = new Date(event.plannable.due_at).getHours();
  } else if (event.plannable.todo_date) {
    startHour = new Date(event.plannable.todo_date).getHours();
  }
  return (
    <div
      style={{ top: startHour * 200, height: eventHeight }}
      className={styles.eventBlock}
    >
      {event.plannable.title}
    </div>
  );
}
