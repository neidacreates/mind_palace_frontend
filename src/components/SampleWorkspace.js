import { useState } from "react";
import Timer from "./Timer";
import TodoList from "./TodoList";
import YouTube from "react-youtube";
import "./Workspace.css";

const SampleWorkspace = ({ workspaceData, taskData }) => {
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

  // video
  const videoOptions = {
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      loop: 1,
      rel: 0,
    },
  };

  const muteVideo = (event) => {
    return event.target.mute();
  };

  return (
    <div>
      <Timer className="widget" seconds={1500} />
      <TodoList
        className="widget"
        tasks={tasks}
        strikethroughToggle={strikethroughToggle}
      />
      {/*
      <Clock />
      <Settings />
      
      <Music /> */}
      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId="2IdffsNov68"
            // https://www.youtube.com/watch?v=2IdffsNov68
            opts={videoOptions}
            className="video-iframe"
            // onReady={muteVideo}
            // onEnd={this._onEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default SampleWorkspace;
