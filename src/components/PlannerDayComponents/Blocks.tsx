import React from 'react';
import styles from '../../styles/Blocks.module.css';
import arrangeBlocks from '../../utils/arrangeBlocks';
import EventBlockContainer from './EventBlockContainer';

type BlocksProps = {
  data: Array<PlannerItem>;
};

export default function Blocks({ data }: BlocksProps) {
  const arrayData = arrangeBlocks(data);

  console.log(arrayData);

  return (
    <div className={styles.blocksParent}>
      <div className={styles.blocks}>
        {arrayData.map((eventArray: Array<PlannerItem>) => (
          <EventBlockContainer
            eventBatchArray={eventArray}
            key={new Date(eventArray[0].plannable_date).getTime()}
          />
        ))}
      </div>
    </div>
  );
}
