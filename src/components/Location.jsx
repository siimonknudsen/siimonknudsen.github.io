import { useState, useEffect } from 'react'

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
      className="flex items-center gap-2 type-caption text-color-secondary"
      title="Available for new work"
    >
      <span className="w-2 h-2 rounded-full bg-accent pulse-glow" aria-hidden="true" />
      <span className="flex items-center gap-1.5">
        <span>{location}</span>
        <span aria-hidden="true" className="opacity-40">·</span>
        <span className="tabular-nums">{formatTime(currentTime)}</span>
      </span>
    </div>
  )
}

export default Location

