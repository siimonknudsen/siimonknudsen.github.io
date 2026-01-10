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
    <div className="flex items-center gap-2 text-[13px] text-color-secondary font-normal">
      <div className="w-2 h-2 rounded-full bg-green-400 pulse-glow"></div>
      <span>{location} - {formatTime(currentTime)}</span>
    </div>
  )
}

export default Location

