// import Timer from "./Timer";
// import Clock from "./Clock";
// import Settings from "./Settings";
// import Todo from "./Todo";
// import Music from "./Music";
// import { useParams, useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Timer from "./Timer";
import TodoList from "./TodoList";

const Workspace = ({ workspaceData, taskData }) => {
  // to do list functions
  const [tasks, setTasks] = useState(taskData);
  const strikethroughToggle = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  };

  const { workspaceName } = useParams();
  const workspaces = workspaceData;
  const workspace = workspaces.find(
    (workspace) => workspace.name.toLowerCase() === workspaceName
  );
  return (
    <>
      <h3>Workspace: {workspace.name}</h3>

      <Timer seconds={1500} />
      <TodoList tasks={tasks} strikethroughToggle={strikethroughToggle} />
      {/* <Timer />
      <Clock />
      <Settings />
      
      <Music /> */}
    </>
  );
};

export default Workspace;
