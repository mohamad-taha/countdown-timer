import React, { useEffect, useState } from "react";
import "./Timer.css";

const Timer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-02-05T00:00:00");
    const currentTime = new Date();
    const diff = targetDate - currentTime;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(!flipped);
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [flipped]);

  return (
    <div className="timer">
      <p className="header">we're launching soon</p>
      <div className="time-wrapper">
        {Object.entries(timeLeft).map(([key, value]) => (
          <div className="time">
            <div key={key} className="time-box">
              <div className="time-value">{value}</div>
            </div>
            <div className="time-label">{key.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
