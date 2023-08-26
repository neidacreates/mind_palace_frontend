import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCollapse from "react-collapsed";
import { Button, Modal } from "react-bootstrap";
import Timer from "./Timer";
import TodoList from "./TodoList";
import Quote from "./Quote";
import YouTube from "react-youtube";
import "./Workspace.css";
import getVideoId from "../utils/YouTubeId";
import getYoutubeThumbnail from "../utils/youtubeThumbnail";

const mockWorkspaceData = {
  id: 1,
  name: "Cafe",
  timer_default: 1500,
  user: 1,
  bakcground_thumbnail: "",
  background_video: "0L38Z9hIi5s",
  timer_length: 1800,
  break_length: 300,
  tasks: [
    {
      id: 1,
      title: "make invoices",
      is_complete: false,
      workspace: 1,
    },
    {
      id: 3,
      title: "write emails",
      is_complete: false,
      workspace: 1,
    },
    {
      id: 4,
      title: "make weekly schedule",
      is_complete: false,
      workspace: 1,
    },
  ],
};

const SampleWorkspace = () => {
  const navigate = useNavigate();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  // ==========================================================
  // Setting Up Current Workspace by Extracting Parameters from Sample Data
  // ==========================================================
  const [currentWorkspace, setCurrentWorkspace] = useState(mockWorkspaceData);
  const workspaceName = currentWorkspace.name;
  const workspaceId = currentWorkspace.id;
  const VideoId = currentWorkspace.background_video;

  // ==========================================================
  // Timer
  // ==========================================================
  const [timerSeconds, setTimerSeconds] = useState(
    currentWorkspace.timer_length
  );
  const [breakSeconds, setBreakSeconds] = useState(
    currentWorkspace.break_length
  );
  const saveTimerSettings = (event) => {
    event.preventDefault();
    setTimerSeconds(event.target.timerMinutes.value * 60);
    setBreakSeconds(event.target.breakMinutes.value * 60);
  };

  // ==========================================================
  // Task List
  // ==========================================================

  // tasks is a list of objects
  const [tasks, setTasks] = useState(mockWorkspaceData.tasks);
  // console.log("1. tasks are ", tasks);

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
    // console.log("2. tasks are ", tasks);
    console.log(!tasks.find((task) => task.id === id).is_complete);
  };

  // when new task is posted
  const handleTaskSubmit = (event) => {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        title: event.target.elements.taskName.value,
        workspace: workspaceId,
        is_complete: false,
        id: event.target.elements.taskName.value,
      },
    ]);
    console.log("tasks after posting are ", tasks);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
  // Editing Workspace
  // ==========================================================
  const [showEditModal, setShowEditModal] = useState(false);
  const handleClose = () => setShowEditModal(false);
  const handleShow = () => setShowEditModal(true);

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const newWorkspaceName = event.target.elements.workspaceName.value;
    const newBackgroundLink = event.target.elements.backgroundLink.value;
    const newBackgroundVideo = getVideoId(newBackgroundLink);

    if (newBackgroundVideo) {
      editWorkspace(newWorkspaceName, newBackgroundVideo);
    } else {
      alert("Oops! That's not a valid YouTube URL, please try again.");
    }
  };

  const editWorkspace = async (workspaceName, backgroundVideo) => {
    const newBackgroundThumbnail = await getYoutubeThumbnail(backgroundVideo);
    setCurrentWorkspace({
      ...mockWorkspaceData,
      name: workspaceName,
      background_thumbnail: newBackgroundThumbnail,
      background_video: backgroundVideo,
    });
  };

  const showQuote = () => {
    const quote = document.getElementById("quote");
    quote.classList.remove("hidden");
  };
  // ==========================================================
  // Rendered Content
  // ==========================================================
  return (
    <div>
      <div className="collapsible settings lightMode">
        <div {...getToggleProps()}>
          <h1>Sample Workspace: {workspaceName}</h1>
          <Button id="expand-settings">
            {isExpanded
              ? "Collapse Tips and Settings"
              : "Expand Tips and Settings"}
          </Button>
        </div>
        <div className="collapse-hidden" {...getCollapseProps()}>
          <p>
            Disclaimer: This is a sample workspace. Any changes you make will
            NOT be saved and the page will reset if you leave or refresh.
          </p>
          <p>
            {" "}
            Tips:
            <ul>
              <li>
                Click and drag the widgets all around the screen to reposition
                them.
              </li>
              <li>
                Click the name of the tasks to strike-through their text, or the
                X to delete them from the list.
              </li>
              <li>
                Hide the quote by pressing the Hide Quote button on it, and make
                it reappear with the Show Quote button below.
              </li>
              <li>
                To pause the timer, press Pause and then Resume to resume it. Do
                not press Start again.
              </li>
            </ul>
          </p>
          <div>
            <Button id="muteBtn" onClick={toggleMuteVideo}>
              {videoMuted ? "Unmute Background" : "Mute Background"}
            </Button>
            <Button onClick={handleShow}>Edit Workspace</Button>
            <Button onClick={showQuote}>Show Quote</Button>
            <Button onClick={() => navigate("/")}>Back to Home</Button>
          </div>
        </div>
      </div>

      <Timer
        timerSeconds={timerSeconds}
        breakSeconds={breakSeconds}
        saveTimerSettings={saveTimerSettings}
      />

      <TodoList
        tasks={tasks}
        strikethroughToggle={strikethroughToggle}
        handleTaskSubmit={handleTaskSubmit}
        deleteTask={deleteTask}
      />

      <Quote></Quote>

      <div className="video-background">
        <div className="video-foreground">
          <YouTube
            videoId={VideoId}
            opts={videoOptions}
            className="video-iframe"
            ref={videoRef}
          />
        </div>
      </div>
      {/* edit workspace modal  */}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="container"
            onSubmit={handleEditSubmit}
            id="editWorkspaceForm"
          >
            <div className="mb-3">
              <label htmlFor="InputWorkspaceName" className="form-label">
                Workspace Name
              </label>
              <input
                type="text"
                name="workspaceName"
                className="form-control"
                id="InputWorkspaceName"
                defaultValue={workspaceName}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="BackgroundLink" className="form-label">
                Background Video Link
              </label>
              <input
                type="text"
                name="backgroundLink"
                className="form-control"
                id="BackgroundLink"
                defaultValue={`https://www.youtube.com/watch?v=${VideoId}`}
                aria-describedby="videoHelpBlock"
              />
              <div id="videoHelpBlock" className="form-text">
                Please use a YouTube video link.
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            form="editWorkspaceForm"
            onClick={handleClose}
          >
            Save Changes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SampleWorkspace;
