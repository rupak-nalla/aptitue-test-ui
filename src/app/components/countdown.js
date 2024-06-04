// pages/countdown.js
import { useState, useEffect } from 'react';
export default function CountdownPage({ onCountdownComplete }) {
const [targetTime, setTargetTime] = useState(new Date()); // Initialize with current date
const [timeLeft, setTimeLeft] = useState(0);

useEffect(() => {
let interval;

// Set the target time to 9 PM on the current date
const currentDate = new Date();
targetTime.setHours(2, 11, 0, 0); // Set the target time to 9 PM
if (targetTime < currentDate) {
     // If the target time is in the past, set it to the next day
     targetTime.setDate(targetTime.getDate() + 1);
}

const calculateTimeLeft = () => {
     const currentTime = new Date().getTime();
     const timeDifference = targetTime.getTime() - currentTime;

     // If the target time has already passed, return 0
     if (timeDifference <= 0) {
     setTimeLeft(0);
     clearInterval(interval);
     console.log("time completed");
     onCountdownComplete();
     return;
     }

     const secondsLeft = Math.floor(timeDifference / 1000);
     setTimeLeft(secondsLeft);
};

interval = setInterval(calculateTimeLeft, 1000);

return () => clearInterval(interval);
}, [targetTime]);

const formatTimeLeft = (seconds) => {
const hours = Math.floor(seconds / 3600);
const minutes = Math.floor((seconds % 3600) / 60);
const remainingSeconds = seconds % 60;

return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};


return (
     <h3 class="text-white font-bold bg-gray-600 p-2 ">{formatTimeLeft(timeLeft)}</h3>
);
}
