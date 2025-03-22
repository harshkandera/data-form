"use client";

import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onTimeout: () => void;
  start: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 5,
  initialSeconds = 0,
  onTimeout,
  start,
}) => {
  const [time, setTime] = useState(initialMinutes * 60 + initialSeconds);
  const [isRunning, setIsRunning] = useState(start);

  useEffect(() => {
    if (!isRunning) return; // Only start countdown when `start` is true

    if (time <= 0) {
      onTimeout();
      setIsRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, time, onTimeout]);

  useEffect(() => {
    if (start) {
      setTime(initialMinutes * 60 + initialSeconds); // Reset time when start becomes true
      setIsRunning(true);
    }
  }, [start, initialMinutes, initialSeconds]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="text-center text-sm text-gray-200">
      <span className="font-medium">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
};

export default CountdownTimer;
