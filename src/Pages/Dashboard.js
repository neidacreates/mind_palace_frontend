// TODO:
// add delete button to each card
// add edit button to each card
// style things
// add nav bar with log out button

import { Link, useLocation } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import getVideoId from "../utils/YouTubeId";
// import { handleClose, handleShow } from "../utils/ModalFunc";

const Dashboard = () => {
  const apiAddress = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();
  const userId = location.state[0].id;
  const [currentWorkspaces, setCurrentWorkspaces] = useState(
    location.state[0].workspaces
  );

  // fetching the updated workspaces from backend everytime we reload the page
  useEffect(() => {
    console.log("inside use effect");
    let mounted = true;
    axios.get(`${apiAddress}/users/${userId}/workspaces`).then((response) => {
      if (mounted) {
        setCurrentWorkspaces(response.data);
      }
    });
    return () => (mounted = false);
  }, []);

  // testing
  // console.log("1. location is ", location);
  // console.log("2. current workspace data is ", currentWorkspaces);
  // console.log("3. current user id is ", userId);

  // modal window
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // posting new workspace
  const postNewWorkspace = async (
    userId,
    workspaceName,
    backgroundThumbnail,
    backgroundVideo
  ) => {
    console.log("inside postNewWorkspace");
    console.log("postnewworkspace thumbnail is ", backgroundThumbnail);
    await wait(5000);

    axios
      .post(`${apiAddress}/users/${userId}/workspaces`, {
        name: workspaceName,
        user: userId,
        background_thumbnail: backgroundThumbnail,
        background_video: backgroundVideo,
      })
      .then((response) => {
        console.log(response.data);
        setCurrentWorkspaces([...currentWorkspaces, response.data]);
        console.log("workspaces after postnewworkspace ", currentWorkspaces);
      })
      .catch((error) => <section>{error}</section>);
  };

  // getting video thumbnail from youtube api
  const getYoutubeThumbnail = (backgroundVideo, workspaceName) => {
    console.log("inside getyoutubethumbnail function");
    // await wait(1000);
    axios
      .get("https://www.googleapis.com/youtube/v3/videos", {
        params: {
          id: backgroundVideo,
          part: "snippet",
          key: process.env.REACT_APP_YOUTUBE_KEY,
        },
      })
      .then((response) => {
        console.log("youtube api response is ", response);
        console.log(
          "youtube api thumbnail is ",
          response.data.items[0].snippet.thumbnails.high.url
        );
        const thumbnail = response.data.items[0].snippet.thumbnails.high.url;
        postNewWorkspace(userId, workspaceName, thumbnail, backgroundVideo);
      });
  };

  // modal window form submission
  const handleSubmit = (event) => {
    // extract name and video link from the form
    // get video id from the link
    // if there was a valid id, call youtube api to get the thumbnail
    // save the thumbnail link in the appropriate variable
    // save the workspace to the database
    // update the dashboard by changing the user state to reflect the new data
    console.log("inside handleSubmit");
    event.preventDefault();

    // testing
    console.log("event is ", event.target);
    console.log(
      "event elements name: ",
      event.target.elements.workspaceName.value
    );
    // testing

    const workspaceName = event.target.elements.workspaceName.value;
    const backgroundLink = event.target.elements.backgroundLink.value;
    const backgroundVideo = getVideoId(backgroundLink);

    if (backgroundVideo) {
      console.log("inside if backgroundVideo");
      const backgroundThumbnail = getYoutubeThumbnail(
        backgroundVideo,
        workspaceName
      );
      console.log("1. background thumbnail is ", backgroundThumbnail);

      // postNewWorkspace(
      //   userId,
      //   workspaceName,
      //   backgroundThumbnail,
      //   backgroundVideo
      // );

      console.log("2. background thumbnail is ", backgroundThumbnail);
    } else {
      alert("Oops! That's not a valid YouTube URL, please try again.");
    }
  };

  // ==========================================================
  // Rendered Content
  // ==========================================================
  return (
    <div>
      <h1>Welcome to your workspace dashboard!</h1>

      <h2>
        Choose one of your existing workspaces from below or make a new one.
      </h2>

      <div className="container">
        <div className="row">
          {currentWorkspaces.map((workspace) => (
            <div className="col-3" key={workspace.id}>
              <div className="card">
                <img
                  src={workspace.background_thumbnail}
                  className="card-img-top"
                  alt="Workspace Background"
                ></img>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link
                      to={workspace.name.toLowerCase()}
                      state={{ workspaces: currentWorkspaces }}
                    >
                      {workspace.name}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
          <div className="col-3">
            <div className="card">
              <div className="card-body">
                <Button onClick={handleShow}>
                  <h5 className="card-title"> + New Workspace</h5>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="container"
            onSubmit={handleSubmit}
            id="newWorkspaceForm"
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
                aria-describedby="videoHelpBlock"
              />
              <div id="videoHelpBlock" className="form-text">
                Please use a YouTube video link.
              </div>
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
            form="newWorkspaceForm"
            onClick={handleClose}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;

// const getUserData = (id) => {
//   return axios
//     .get(`${apiAddress}/users/${id}`)
//     .then((response) => {
//       const current_user = response.data;
//       console.log("axios call data ", current_user);
//       return current_user;
//     })
//     .catch((error) => <section>{error.response.data.message}</section>);
// };

// useEffect(() => {
//   let mounted = true;
//   getUserData(current_user_id).then((user_data) => {
//     if (mounted) {
//       setUser(user_data);
//     }
//   });
//   return () => (mounted = false);
// }, []);
