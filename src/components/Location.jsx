import { useState, useEffect } from 'react'
import styles from './Location.module.css'

const formatTime = (date) =>
  date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

function Location({ location = "Aarhus, Denmark" }) {
  // Store the formatted HH:MM string, not the Date — the 1s tick then only
  // re-renders when the displayed minute actually changes (same string bails).
  const [currentTime, setCurrentTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = formatTime(new Date());
        return next === prev ? prev : next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`type-caption text-color-secondary ${styles.root}`}
      title="Available for new work"
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.group}>
        <span>{location}</span>
        <span aria-hidden="true" className={styles.sep}>·</span>
        <span className={styles.time}>{currentTime}</span>
      </span>
    </div>
  )
}

export default Location

