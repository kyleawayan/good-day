import React from 'react';
import styles from '../styles/Splitter.module.css';
import Clock from './Clock';
import Planner from './Planner';
import UpcomingEvents from './UpcomingEvents';

type SplitterProps = {
  token: string;
};

export default function Splitter({ token }: SplitterProps) {
  return (
    <div className={styles.splitter}>
      <div className={styles.sidebar}>
        <Clock />
        <UpcomingEvents token={token} />
      </div>
      <div className={styles.content}>
        <Planner token={token} />
      </div>
    </div>
  );
}
