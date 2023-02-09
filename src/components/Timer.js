// TODO:
// settings modal window
// switching timer to break (probably just make a button to switch which also changes the secondsLeft state and change the heading)

import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Draggable from "react-draggable";

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

  // modal window controls
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleTimerSubmit = (event) => {
    event.preventDefault();
    axios.patch();
    console.log(event.target.timerMinutes.value);
    console.log(event.target.breakMinutes.value);
  };

  // stuff that gets rendered
  return (
    <Draggable>
      <div className="widget container timer">
        <h3>🍅 ~ Timer ~ 🍅</h3>

        <div id="timerButtons">
          <Button onClick={start}>Start</Button>
          <Button onClick={pauseTimer}>
            {timerPaused ? "Resume" : "Pause"}
          </Button>
          <Button onClick={clearTimer}>Reset</Button>
          <Button onClick={handleShow}>Settings</Button>
        </div>

        <div id="timerDisplay">{secondsToTimeString(secondsLeft)}</div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Timer Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="container"
              onSubmit={handleTimerSubmit}
              id="TimerForm"
            >
              <div className="mb-3">
                <label htmlFor="timerMinutes" className="form-label">
                  Timer (Minutes)
                </label>
                <input
                  type="number"
                  name="timerMinutes"
                  className="form-control"
                  id="timerMinutes"
                  defaultValue="25"
                  min="1"
                  aria-describedby="timerHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="breakMinutes" className="form-label">
                  Break (Minutes)
                </label>
                <input
                  type="number"
                  name="breakMinutes"
                  className="form-control"
                  id="breakMinutes"
                  defaultValue="5"
                  min="1"
                  aria-describedby="breakHelp"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="TimerForm"
              onClick={handleClose}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Draggable>
  );
};

export default Timer;
