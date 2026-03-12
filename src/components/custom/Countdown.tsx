"use client";

import React, { useEffect, useState } from "react";

const Countdown = () => {
  const calculateTimeLeft = () => {
    const endTime = new Date("2024-12-31T00:00:00").getTime();
    const now = new Date().getTime();
    const difference = endTime - now;

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: 0,
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-5 md:gap-6 text-center">
      <div className="flex flex-col p-2 bg-secondary rounded-lg text-foreground">
        <span className="font-mono text-2xl sm:text-4xl md:text-5xl tabular-nums">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        days
      </div>
      <div className="flex flex-col p-2 bg-secondary rounded-lg text-foreground">
        <span className="font-mono text-2xl sm:text-4xl md:text-5xl tabular-nums">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-secondary rounded-lg text-foreground">
        <span className="font-mono text-2xl sm:text-4xl md:text-5xl tabular-nums">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-secondary rounded-lg text-foreground">
        <span className="font-mono text-2xl sm:text-4xl md:text-5xl tabular-nums">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
