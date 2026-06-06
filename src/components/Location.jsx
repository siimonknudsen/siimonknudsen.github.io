import { useState, useEffect } from 'react'
import styles from './Location.module.css'

function Location({ location = "Aarhus, Denmark" }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div
      className={`type-caption text-color-secondary ${styles.root}`}
      title="Available for new work"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.group}>
        <span>{location}</span>
        <span aria-hidden="true" className={styles.sep}>·</span>
        <span className={styles.time}>{formatTime(currentTime)}</span>
      </span>
    </div>
  )
}

export default Location

