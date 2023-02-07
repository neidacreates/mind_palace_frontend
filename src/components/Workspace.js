// TODO:
// mute video
// make widgets have a background color so they're visible over the video

// import Timer from "./Timer";
// import Clock from "./Clock";
// import Settings from "./Settings";
// import Todo from "./Todo";
// import Music from "./Music";
// import { useParams, useOutletContext } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Timer from "./Timer";
import TodoList from "./TodoList";
import YouTube from "react-youtube";
import "./Workspace.css";
import { Button } from "react-bootstrap";

const Workspace = () => {
  let { state } = useLocation();
  const { workspaceName } = useParams();
  const workspaces = state.workspaces;
  console.log(workspaces);

  // finding the proper workspace
  const workspace = workspaces.find(
    (workspace) => workspace.name.toLowerCase() === workspaceName
  );

  // to do list
  const [tasks, setTasks] = useState(workspace.tasks);
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

  // video background
  //https://developers.google.com/youtube/player_parameters
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

  return (
    <div>
      <h3>Workspace: {workspace.name}</h3>

      <Timer className="widget" seconds={workspace.timer_length} />
      <TodoList
        className="widget"
        tasks={tasks}
        strikethroughToggle={strikethroughToggle}
      />
      <Button onClick={toggleMuteVideo}>
        {videoMuted ? "Unmute" : "Mute"}
      </Button>
      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId={workspace.background_video}
            // https://www.youtube.com/watch?v=2IdffsNov68
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
