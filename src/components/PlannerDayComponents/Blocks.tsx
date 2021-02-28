import React from 'react';
import styles from '../../styles/Blocks.module.css';
import EventBlock from './EventBlock';

type BlocksProps = {
  data: Array<PlannerItem>;
};

export default function Blocks({ data }: BlocksProps) {
  return (
    <div className={styles.blocksParent}>
      <div className={styles.blocks}>
        {data.map((event: PlannerItem) => (
          <EventBlock event={event} key={event.plannable.id} />
        ))}
      </div>
    </div>
  );
}
