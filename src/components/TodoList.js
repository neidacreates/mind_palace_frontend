import PropTypes from "prop-types";
import TodoListTask from "./TodoListTask";
import { Button, Modal } from "react-bootstrap";
import Draggable from "react-draggable";
// import { handleClose, handleShow } from "../utils/ModalFunc";
import { useState } from "react";

const TodoList = ({
  tasks,
  strikethroughToggle,
  handleTaskSubmit,
  deleteTask,
}) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // useEffect(() => {
  //   console.log("inside use effect");
  //   let mounted = true;
  //   axios.get(`${apiAddress}/users/${userId}/workspaces`).then((response) => {
  //     if (mounted) {
  //       setCurrentWorkspaces(response.data);
  //     }
  //   });
  //   return () => (mounted = false);
  // }, []);

  const makeAllTasks = tasks.map((task) => {
    return (
      <TodoListTask
        key={task.id}
        id={task.id}
        title={task.title}
        is_complete={task.is_complete}
        strikethroughToggle={strikethroughToggle}
        deleteTask={deleteTask}
      />
    );
  });

  return (
    <Draggable>
      <div className="container widget lightMode">
        <h3> Task List </h3>
        <ul className="taskList">{makeAllTasks}</ul>
        <Button onClick={handleShow}>Add Task</Button>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="container"
              onSubmit={handleTaskSubmit}
              id="taskForm"
            >
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">
                  Task Name
                </label>
                <input
                  type="text"
                  name="taskName"
                  className="form-control"
                  id="taskName"
                  aria-describedby="taskHelp"
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
              form="taskForm"
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

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      is_complete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  strikethroughToggle: PropTypes.func.isRequired,
  handleTaskSubmit: PropTypes.func.isRequired,
};

export default TodoList;
