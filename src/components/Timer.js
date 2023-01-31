import React, { useEffect, useState } from "react";

const Timer = ({ seconds }) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timer, setTimer] = useState();

  const pauseTimer = () => {
    if (timerPaused) {
      setTimerPaused(!timerPaused);
      start();
    } else {
      return setTimerPaused(!timerPaused);
    }
  };

  const clearTimer = () => {
    clearInterval(timer);
    setSecondsLeft(seconds);
  };

  const start = () => {
    const timer = setInterval(() => {
      console.log("inside setInterval");
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }

      // if paused or not
      // if paused return seconds wihtout updating
      // if not paused keep going -1
      // pause button also checks condition if already paused
      // restart setInterval after pausing
    }, 1000);
    setTimer(timer);
  };
  // whenever secondsLeft and timer re-renders/changes, useEffect will check if the seconds are 0 and clearInterval accordingly
  useEffect(() => {
    if (secondsLeft === 0 || timerPaused) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer, timerPaused]);
  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  // DONE: function to convert seconds into a string
  const secondsToTimeString = (totalSeconds) => {
    const milliSeconds = totalSeconds * 1000;
    const result = new Date(milliSeconds).toISOString().slice(14, 19);
    return result;
  };
  // stuff that gets rendered
  return (
    <div className="container">
      <button className="btn btn-primary" onClick={start}>
        Start
      </button>
      <button className="btn btn-primary" onClick={pauseTimer}>
        Pause
      </button>
      <button className="btn btn-primary" onClick={clearTimer}>
        Reset
      </button>
      <div>{secondsToTimeString(secondsLeft)}</div>
    </div>
  );
};

export default Timer;
