import React from 'react';
import styles from '../../styles/UpcomingEventDays.module.css';
import Event from './Event';

type UpcomingEventDaysProps = {
  dayEvents: DateEventObject;
};

export default function UpcomingEventDays({
  dayEvents,
}: UpcomingEventDaysProps) {
  return (
    <div className={styles.upcomingEventDay}>
      <h2>{dayEvents.date.toLocaleDateString()}</h2>
      {dayEvents.data.map((event: PlannerItem) => (
        <Event event={event} key={event.plannable.id} />
      ))}
    </div>
  );
}
