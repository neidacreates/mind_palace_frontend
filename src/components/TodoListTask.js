import React from "react";
import PropTypes from "prop-types";
import "./TodoListTask.css";
import { Button } from "react-bootstrap";

const Task = ({ id, title, is_complete, strikethroughToggle, deleteTask }) => {
  const toggleCompleteClass = !is_complete
    ? "task_incomplete"
    : "task_complete";
  return (
    <li className={toggleCompleteClass}>
      <span
        onClick={() => {
          strikethroughToggle(id);
        }}
      >
        {title}
      </span>
      <Button onClick={() => deleteTask(id)}>X</Button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  is_complete: PropTypes.bool.isRequired,
  strikethroughToggle: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
