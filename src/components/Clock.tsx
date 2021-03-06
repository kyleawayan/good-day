import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/Clock.module.css';
import SettingsContext from '../utils/settingsOpen';

const zeroPad = (num: number, places: number) =>
  String(num).padStart(places, '0');

function getTime() {
  const date = new Date();
  return {
    hour: (date.getHours() % 12).toString().replace(/(?<!\S)0(?!\S)/g, '12'),
    minute: zeroPad(date.getMinutes(), 2),
    seconds: zeroPad(date.getSeconds(), 2),
  };
}

export default function Clock() {
  const [time, setTime] = useState({
    hour: '0',
    minute: '00',
    seconds: '00',
  });
  const [showSettingsIcon, setShowSettingsIcon] = useState(false);
  const { setSettingsOpen } = useContext(SettingsContext);

  const openSettingsKeypress = (event: { key: string }) => {
    if (event.key === 's') {
      setSettingsOpen(true);
    }
  };

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div
      className={styles.clock}
      onMouseEnter={() => setShowSettingsIcon(true)}
      onMouseLeave={() => setShowSettingsIcon(false)}
    >
      {showSettingsIcon && (
        <div
          className={styles.settingsIcon}
          onClick={() => setSettingsOpen(true)}
          onKeyPress={openSettingsKeypress}
          role="button"
          tabIndex={0}
        >
          settings
        </div>
      )}
      <span className={styles.hoursAndMinutes}>
        {time.hour}:{time.minute}
        <span className={styles.seconds}>{time.seconds}</span>
      </span>
      <div className={styles.currentTimeLine} />
    </div>
  );
}
