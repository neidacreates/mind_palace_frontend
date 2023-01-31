import React from "react";
import PropTypes from "prop-types";
import "./TodoListTask.css";

const Task = ({ id, taskName, isComplete, strikethroughToggle }) => {
  const toggleCompleteClass = !isComplete ? "task_incomplete" : "task_complete";
  return (
    <li>
      <span
        className={toggleCompleteClass}
        onClick={() => {
          strikethroughToggle(id);
        }}
      >
        {taskName}
      </span>
      <button className="btn btn-primary">X</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  taskName: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  strikethroughToggle: PropTypes.func.isRequired,
};

export default Task;
