import React from 'react';
import styles from '../../styles/Ruler.module.css';

export default function Ruler() {
  const divs = Array.from({ length: 24 });
  return (
    <div>
      {divs.map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className={styles.hour}>
          {index}
        </div>
      ))}
    </div>
  );
}
