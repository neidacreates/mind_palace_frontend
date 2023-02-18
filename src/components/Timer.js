import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import Draggable from "react-draggable";

const Timer = ({ timerSeconds, breakSeconds, saveTimerSettings }) => {
  const [secondsLeft, setSecondsLeft] = useState(timerSeconds);
  const [timerPaused, setTimerPaused] = useState(false);
  const [timer, setTimer] = useState();
  const [focusMode, setFocusMode] = useState(true);
  const soundRef = useRef();

  const playSound = () => {
    soundRef.current.play();
  };

  const breakToggle = () => {
    setFocusMode(!focusMode);
    if (focusMode) {
      clearInterval(timer);
      setSecondsLeft(breakSeconds);
    } else {
      clearInterval(timer);
      setSecondsLeft(timerSeconds);
    }
  };

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
    if (focusMode) {
      clearInterval(timer);
      setSecondsLeft(timerSeconds);
    } else {
      clearInterval(timer);
      setSecondsLeft(breakSeconds);
    }
    setTimerPaused(false);
  };

  const start = () => {
    const timer = setInterval(() => {
      setSecondsLeft((secondsLeft) => secondsLeft - 1);
      if (secondsLeft === 0) {
        playSound();
        clearInterval(timer);
      }
    }, 1000);
    setTimer(timer);
  };

  useEffect(() => {
    if (secondsLeft === 0 || timerPaused) {
      clearInterval(timer);
    }
  }, [secondsLeft, timer, timerPaused]);

  useEffect(() => {
    if (secondsLeft === 0) {
      playSound();
    }
  }, [secondsLeft]);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  useEffect(() => {
    clearInterval(timer);
    if (focusMode) {
      setSecondsLeft(timerSeconds);
    } else {
      setSecondsLeft(breakSeconds);
    }
  }, [timerSeconds, breakSeconds]);

  const secondsToTimeString = (totalSeconds) => {
    const milliSeconds = totalSeconds * 1000;
    const result = new Date(milliSeconds).toISOString().slice(14, 19);
    return result;
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Draggable>
      <div className="widget container timer lightMode">
        <h3>{focusMode ? "🌱 Focus 🌱" : "🍿 Break 🍿"}</h3>

        <div id="timerButtons">
          <Button onClick={start}>Start</Button>
          <Button onClick={pauseTimer}>
            {timerPaused ? "Resume" : "Pause"}
          </Button>
          <Button onClick={clearTimer}>Reset</Button>
          <Button onClick={handleShow}>Settings</Button>
        </div>

        <div id="timerDisplay">{secondsToTimeString(secondsLeft)}</div>
        <Button onClick={breakToggle}>
          Switch to {focusMode ? " Break Mode" : " Focus Mode"}
        </Button>

        <Modal show={showModal} onHide={handleClose} className="modalPopup">
          <Modal.Header closeButton>
            <Modal.Title>Timer Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="container"
              onSubmit={saveTimerSettings}
              id="TimerForm"
            >
              <div className="mb-3">
                <label htmlFor="timerMinutes" className="form-label">
                  Focus Minutes
                </label>
                <input
                  type="number"
                  name="timerMinutes"
                  className="form-control"
                  id="timerMinutes"
                  defaultValue="25"
                  min="0"
                  aria-describedby="timerHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="breakMinutes" className="form-label">
                  Break Minutes
                </label>
                <input
                  type="number"
                  name="breakMinutes"
                  className="form-control"
                  id="breakMinutes"
                  defaultValue="5"
                  min="0"
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
        <audio src="/twinkle_alarm.mp3" type="audio/mpeg" ref={soundRef}>
          Audio
        </audio>
      </div>
    </Draggable>
  );
};

Timer.propTypes = {
  timerSeconds: PropTypes.number.isRequired,
  breakSeconds: PropTypes.number.isRequired,
  saveTimerSettings: PropTypes.func.isRequired,
};

export default Timer;
