// TODO:

// import Timer from "./Timer";
// import Clock from "./Clock";
// import Settings from "./Settings";
// import Music from "./Music";
// import { useParams, useOutletContext } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Timer from "./Timer";
import TodoList from "./TodoList";
import YouTube from "react-youtube";
import "./Workspace.css";
import { Button } from "react-bootstrap";
import Draggable from "react-draggable";
import axios from "axios";

const Workspace = () => {
  let { state } = useLocation();
  const { workspaceName } = useParams();
  const workspaces = state.workspaces;
  const apiAddress = process.env.REACT_APP_BACKEND_URL;
  // console.log("workspaces are ", workspaces);

  // finding the proper workspace
  const workspace = workspaces.find(
    (workspace) => workspace.name.toLowerCase() === workspaceName
  );

  // ==========================================================
  // Task List
  // ==========================================================

  // tasks is a list of objects
  const [tasks, setTasks] = useState(workspace.tasks);
  console.log("1. tasks are ", tasks);

  // when updating completeness
  const strikethroughToggle = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          is_complete: !task.is_complete,
        };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
    console.log("2. tasks are ", tasks);
    console.log(!tasks.find((task) => task.id === id).is_complete);
    axios
      .patch(`${apiAddress}/workspaces/${workspace.id}/tasks/${id}`, {
        is_complete: !tasks.find((task) => task.id === id).is_complete,
      })
      .then(
        (response) =>
          console.log("response after sending complete patch", response.data),
        console.log("tasks after strikethrough are ", tasks)
      )
      .catch((error) => console.error(error));
  };

  // useEffect(() => {
  //   axios
  //     .patch(`${apiAddress}/workspaces/${workspace.id}/tasks/${id}`, {
  //       is_complete: !tasks.find((task) => task.id === id).is_complete,
  //     })
  //     .then(
  //       (response) =>
  //         console.log("response after sending complete patch", response.data),
  //       console.log("tasks after strikethrough are ", tasks)
  //     )
  //     .catch((error) => console.error(error));
  // }, [tasks]);

  // when new task is posted
  const handleTaskSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${apiAddress}/workspaces/${workspace.id}/tasks`, {
        title: event.target.elements.taskName.value,
        workspace: workspace.id,
      })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error(error));
    console.log("tasks after posting are ", tasks);
  };

  const deleteTask = (id) => {
    axios
      .delete(`${apiAddress}/workspaces/${workspace.id}/tasks/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error(error));
  };
  // ==========================================================
  // Video Background
  // https://developers.google.com/youtube/player_parameters
  // ==========================================================

  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      rel: 0,
    },
  };

  const videoRef = useRef(null);
  const [videoMuted, setVideoMuted] = useState(false);

  const toggleMuteVideo = () => {
    if (videoMuted) {
      videoRef.current.internalPlayer.unMute();
      setVideoMuted(false);
    } else {
      videoRef.current.internalPlayer.mute();
      setVideoMuted(true);
    }
  };
  // ==========================================================
  // Rendered Content
  // ==========================================================
  return (
    <div>
      <div>Current Workspace: {workspace.name}</div>
      <Draggable>
        <Button id="muteBtn" onClick={toggleMuteVideo}>
          {videoMuted ? "Unmute Background" : "Mute Background"}
        </Button>
      </Draggable>

      <Timer className="widget" seconds={workspace.timer_length} />

      <TodoList
        className="widget"
        tasks={tasks}
        strikethroughToggle={strikethroughToggle}
        handleTaskSubmit={handleTaskSubmit}
        deleteTask={deleteTask}
      />

      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId={workspace.background_video}
            opts={videoOptions}
            className="video-iframe"
            ref={videoRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
