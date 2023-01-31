import React, { useEffect, useState } from "react";

const Timer = ({ seconds }) => {
  // TODO: timer functionality???
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timer, setTimer] = useState();
  const start = () => {
    const timer = setInterval(() => {
      // if paused or not
      // if paused return seconds wihtout updating
      // if not paused keep going -1
      // pause button also checks condition if already paused
      // restart setInterval after pausing
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };
  useEffect(() => {
    if (secondsLeft === 0) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer]);
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
      <div>{secondsToTimeString(secondsLeft)}</div>
    </div>
  );
};

export default Timer;
