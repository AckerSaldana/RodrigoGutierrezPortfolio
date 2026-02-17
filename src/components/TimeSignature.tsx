import { useEffect, useState } from 'react';
import './TimeSignature.css';

function getTimeString(): string {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Monterrey',
  });
  return formatter.format(now);
}

export default function TimeSignature() {
  const [time, setTime] = useState(getTimeString);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-signature" aria-hidden="true">
      SAL &middot; {time} CST
    </div>
  );
}
