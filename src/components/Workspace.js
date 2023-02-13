// TODO:

// import Timer from "./Timer";
// import Clock from "./Clock";
// import Settings from "./Settings";
// import Music from "./Music";
// import { useParams, useOutletContext } from "react-router-dom";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import Timer from "./Timer";
import TodoList from "./TodoList";
import YouTube from "react-youtube";
import "./Workspace.css";
import { Button, Modal } from "react-bootstrap";
import Draggable from "react-draggable";
import axios from "axios";
import getVideoId from "../utils/YouTubeId";
import getYoutubeThumbnail from "../utils/youtubeThumbnail";

const Workspace = () => {
  const navigate = useNavigate();
  const apiAddress = process.env.REACT_APP_BACKEND_URL;
  let { state } = useLocation();
  // name of current workspace is extracted from url parameter
  const { workspaceName } = useParams();
  // all of the workspaces are passsed in from state
  const workspaces = state.workspaces;

  // console.log("workspaces are ", workspaces);

  // finding the proper workspace
  const workspace = workspaces.find(
    (workspace) => workspace.name.toLowerCase() === workspaceName
  );
  // ==========================================================
  // Setting Up Current Workspace
  // ==========================================================
  const [currentWorkspace, setCurrentWorkspace] = useState(workspace);
  const currentWorkspaceId = currentWorkspace.id;
  const currentWorkspaceVideoId = currentWorkspace.background_video;
  const currentWorkspaceName = currentWorkspace.name;

  // ==========================================================
  // Timer
  // ==========================================================
  const [timerSeconds, setTimerSeconds] = useState(workspace.timer_length);
  const [breakSeconds, setBreakSeconds] = useState(workspace.break_length);
  const saveTimerSettings = (event) => {
    event.preventDefault();
    console.log(event.target.timerMinutes.value);
    console.log(event.target.breakMinutes.value);
    axios
      .patch(`${apiAddress}/workspaces/${workspace.id}`, {
        timer_length: event.target.timerMinutes.value * 60,
        break_length: event.target.breakMinutes.value * 60,
      })
      .then((response) => {
        setTimerSeconds(response.data.timer_length);
        setBreakSeconds(response.data.break_length);
      })
      .catch((error) => console.error(error));
  };

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
      editWorkspace(currentWorkspaceId, newWorkspaceName, newBackgroundVideo);
    } else {
      alert("Oops! That's not a valid YouTube URL, please try again.");
    }
  };

  const editWorkspace = async (workspaceId, workspaceName, backgroundVideo) => {
    try {
      const newBackgroundThumbnail = await getYoutubeThumbnail(backgroundVideo);
      // patch response returns the current workspace data
      const patchResponse = await axios.patch(
        `${apiAddress}/workspaces/${workspaceId}`,
        {
          name: workspaceName,
          background_thumbnail: newBackgroundThumbnail,
          background_video: backgroundVideo,
        }
      );
      setCurrentWorkspace(patchResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================================
  // Delete Workspace
  // ==========================================================
  const deleteWorkspace = () => {
    axios.delete(`${apiAddress}/workspaces/${currentWorkspaceId}`);
    navigate(-1);
  };
  // ==========================================================
  // Rendered Content
  // ==========================================================
  return (
    <div>
      <section className="widget">
        <h1>Current Workspace: {currentWorkspaceName}</h1>
        <Button id="muteBtn" onClick={toggleMuteVideo}>
          {videoMuted ? "Unmute Background" : "Mute Background"}
        </Button>
        <Button onClick={handleShow}>Settings</Button>
      </section>

      <Timer
        className="widget"
        timerSeconds={timerSeconds}
        breakSeconds={breakSeconds}
        saveTimerSettings={saveTimerSettings}
      />

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
            videoId={currentWorkspaceVideoId}
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
                defaultValue={currentWorkspaceName}
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
                defaultValue={`https://www.youtube.com/watch?v=${currentWorkspaceVideoId}`}
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
          <Button variant="danger" onClick={deleteWorkspace}>
            Delete Workspace
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Workspace;
