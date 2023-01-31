import PropTypes from "prop-types";
import TodoListTask from "./TodoListTask";

const TodoList = ({ tasks, strikethroughToggle }) => {
  const makeAllTasks = tasks.map((task) => {
    return (
      <TodoListTask
        key={task.id}
        id={task.id}
        taskName={task.taskName}
        isComplete={task.isComplete}
        strikethroughToggle={strikethroughToggle}
      />
    );
  });

  return (
    <div className="container">
      <ul className="taskList">{makeAllTasks}</ul>
    </div>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      taskName: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  strikethroughToggle: PropTypes.func.isRequired,
};

export default TodoList;
