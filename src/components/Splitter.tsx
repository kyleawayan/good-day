import React from 'react';
import styles from '../styles/splitter.module.css';
import Clock from './Clock';
import Calendar from './Calendar';

type SplitterProps = {
  token: string;
};

export default function Splitter({ token }: SplitterProps) {
  return (
    <div className={styles.splitter}>
      <div className={styles.sidebar}>
        <Clock />
      </div>
      <div className={styles.content}>
        <Calendar token={token} />
      </div>
    </div>
  );
}
