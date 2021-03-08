import React from 'react';
import styles from '../styles/Splitter.module.css';
import Clock from './Clock';
import Planner from './Planner';
import UpcomingEvents from './UpcomingEvents';

type SplitterProps = {
  token: string;
  canvasUrl: string;
};

export default function Splitter({ token, canvasUrl }: SplitterProps) {
  return (
    <div className={styles.splitter}>
      <div className={styles.sidebar}>
        <Clock />
        <UpcomingEvents token={token} canvasUrl={canvasUrl} />
      </div>
      <div className={styles.content}>
        <Planner token={token} canvasUrl={canvasUrl} />
      </div>
    </div>
  );
}
