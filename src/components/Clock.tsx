import React, { useEffect, useState } from 'react';
import styles from '../styles/Clock.module.css';

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0');

function getTime() {
  const date = new Date();
  return {
    hour: date.getHours() % 12,
    minute: zeroPad(date.getMinutes(), 2),
    seconds: zeroPad(date.getSeconds(), 2),
  };
}

export default function Clock() {
  const [time, setTime] = useState({
    hour: 0,
    minute: '00',
    seconds: '00',
  });

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className={styles.clock}>
      <span className={styles.hoursAndMinutes}>
        {time.hour}:{time.minute}
        <span className={styles.seconds}>{time.seconds}</span>
      </span>
    </div>
  );
}
