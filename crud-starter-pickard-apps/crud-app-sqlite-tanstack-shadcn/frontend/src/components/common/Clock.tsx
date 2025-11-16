import { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-text-muted text-sm">
      {time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};
