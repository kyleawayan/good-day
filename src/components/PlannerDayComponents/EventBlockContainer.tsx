import React from 'react';
import styles from '../../styles/EventBlockContainer.module.css';
import EventBlock from './EventBlock';

type EventBlockContainerProps = {
  eventBatchArray: Array<PlannerItem>;
};

export default function EventBlockContainer({
  eventBatchArray,
}: EventBlockContainerProps) {
  console.log(eventBatchArray);
  return (
    <div className={styles.parent}>
      {eventBatchArray.map((event: PlannerItem) => (
        <div className={styles.child} key={event.plannable.id}>
          <EventBlock event={event} />
        </div>
      ))}
    </div>
  );
}
