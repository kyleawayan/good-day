import React from 'react';
import styles from '../../styles/EventBlock.module.css';

const palette = [
  [250, 105, 85],
  [151, 87, 217],
  [108, 207, 240],
  [95, 217, 87],
  [252, 222, 101],
];

type EventBlockProps = {
  event: PlannerItem;
};

export default function EventBlock({ event }: EventBlockProps) {
  let startTime = 0;
  let eventHeight = 50;
  if (event.plannable.start_at) {
    startTime = new Date(event.plannable.start_at).getTime();
    if (event.plannable.end_at) {
      const durationHoursDecimal =
        (new Date(event.plannable.end_at).getTime() -
          new Date(event.plannable.start_at).getTime()) /
        60000 /
        60;
      eventHeight = 200 * durationHoursDecimal;
    }
  } else if (event.plannable.due_at) {
    startTime = new Date(event.plannable.due_at).getTime();
  } else if (event.plannable.todo_date) {
    startTime = new Date(event.plannable.todo_date).getTime();
  }
  const hoursSinceStartOfCurrentDay =
    (startTime - new Date(event.plannable_date).setHours(0, 0, 0, 0)) /
    60000 /
    60;

  console.log(event.course_id % 5);
  return (
    <div
      style={{
        top: hoursSinceStartOfCurrentDay * 200,
        height: eventHeight,
        backgroundColor: `rgba(${palette[event.course_id % 5][0]}, ${
          palette[event.course_id % 5][1]
        }, ${palette[event.course_id % 5][2]}, 0.5)`,
      }}
      className={styles.eventBlock}
    >
      {event.plannable.title}
    </div>
  );
}
