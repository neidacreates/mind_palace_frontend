// import mockWorkspaces from "../testData";
import { Link, useLocation } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const Dashboard = () => {
  const location = useLocation();
  // testing
  console.log("location is ", location);
  const user_data = location.state[0];
  // testing
  console.log("current user data is ", user_data);
  const [user, setUser] = useState(user_data);

  // const apiAddress = process.env.REACT_APP_BACKEND_URL;

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

  return (
    <div>
      <h1>Welcome to your workspace dashboard, {user.username}!</h1>

      <h2>
        Choose one of your existing workspaces from below or make a new one.
      </h2>

      <div className="container">
        <div className="row">
          {user.workspaces.map((workspace) => (
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
                      state={{ workspaces: user.workspaces }}
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
                <Button>
                  <h5 className="card-title"> Create a New Workspace</h5>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Outlet context={mockWorkspaces} /> */}
    </div>
  );
};

export default Dashboard;
