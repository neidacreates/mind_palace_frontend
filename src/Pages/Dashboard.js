import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import getVideoId from "../utils/YouTubeId";
import getYoutubeThumbnail from "../utils/youtubeThumbnail";

const Dashboard = () => {
  const apiAddress = process.env.REACT_APP_BACKEND_URL;
  const location = useLocation();
  const userId = location.state[0].id;
  const userName = location.state[0].username;
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
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClose = (modalType) => {
    if (modalType === "edits") {
      setShowEditModal(false);
    } else {
      setShowModal(false);
    }
  };
  const handleShow = (modalType) => {
    if (modalType === "edits") {
      setShowEditModal(true);
    } else {
      setShowModal(true);
    }
  };

  // ==========================================================
  // posting new workspace
  // ==========================================================
  const postNewWorkspace = async (userId, workspaceName, backgroundVideo) => {
    try {
      const backgroundThumbnail = await getYoutubeThumbnail(backgroundVideo);

      const postResponse = await axios.post(
        `${apiAddress}/users/${userId}/workspaces`,
        {
          name: workspaceName,
          user: userId,
          background_thumbnail: backgroundThumbnail,
          background_video: backgroundVideo,
        }
      );
      setCurrentWorkspaces([...currentWorkspaces, postResponse.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================================
  // editing a workspace
  // ==========================================================
  // const editWorkspace = async (userId, workspaceName, backgroundVideo) => {
  //   try {
  //     const backgroundThumbnail = await getYoutubeThumbnail(backgroundVideo);

  //     const patchResponse = await axios.patch(
  //       `${apiAddress}/users/${userId}/workspaces/${workspaceName}`,
  //       {
  //         name: workspaceName,
  //         user: userId,
  //         background_thumbnail: backgroundThumbnail,
  //         background_video: backgroundVideo,
  //       }
  //     );
  //     setCurrentWorkspaces([...currentWorkspaces, patchResponse.data]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // ==========================================================
  // getting video thumbnail from youtube api
  // ==========================================================

  // .then((response) => {
  //   console.log("youtube api response is ", response);
  //   console.log(
  //     "youtube api thumbnail is ",
  //     response.data.items[0].snippet.thumbnails.high.url
  //   );
  // return response.data.items[0].snippet.thumbnails.high.url;
  // postNewWorkspace(userId, workspaceName, thumbnail, backgroundVideo);
  // });

  // ==========================================================
  // new workspace modal window form submission
  // ==========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const workspaceName = event.target.elements.workspaceName.value;
    const backgroundLink = event.target.elements.backgroundLink.value;
    const backgroundVideo = getVideoId(backgroundLink);

    if (backgroundVideo) {
      postNewWorkspace(userId, workspaceName, backgroundVideo);
    } else {
      alert("Oops! That's not a valid YouTube URL, please try again.");
    }
  };

  // ==========================================================
  // Rendered Content
  // ==========================================================
  return (
    <div className="dashboard-container">
      <h1>Welcome to your workspace dashboard, {userName}!</h1>

      <h2>
        Choose one of your existing workspaces from below or make a new one.
      </h2>

      <div className="container">
        <div className="row">
          {currentWorkspaces.map((workspace) => (
            <div className="col-3" key={workspace.id}>
              <div className="card" id={workspace.id}>
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
                <Button className="dash-btn" onClick={() => handleShow("new")}>
                  <h5 className="card-title"> + New Workspace</h5>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => handleClose("new")}>
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
          <Button variant="secondary" onClick={() => handleClose("new")}>
            Close
          </Button>
          <Button
            className="modal-btn"
            type="submit"
            form="newWorkspaceForm"
            onClick={() => handleClose("new")}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal show={showEditModal} onHide={() => handleClose("edits")}>
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
          <Button
            variant="primary"
            type="submit"
            form="editWorkspaceForm"
            onClick={() => handleClose("edits")}
          >
            Save Changes
          </Button>
          <Button variant="danger" onClick={() => handleClose("edits")}>
            Delete Workspace
          </Button>
          <Button variant="secondary" onClick={() => handleClose("edits")}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
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
