import { useState, useEffect } from 'react';

export default function CountdownPage({ onCountdownComplete }) {
  const [targetTime, setTargetTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let interval;

    // Set the target time to 20 minutes from the current time
    const currentTime = new Date();
    const countdownTime = new Date(currentTime.getTime() + (20 * 60 * 1000));
    setTargetTime(countdownTime);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeDifference = countdownTime.getTime() - now;

      // If the countdown has finished, return 0
      if (timeDifference <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
        console.log("Countdown finished!");
        onCountdownComplete();
        return;
      }

      const secondsLeft = Math.floor(timeDifference / 1000);
      setTimeLeft(secondsLeft);
    };

    interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [onCountdownComplete]);

  const formatTimeLeft = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <h3 className="text-white font-bold bg-gray-600 p-2">{formatTimeLeft(timeLeft)}</h3>
  );
}
