// import mockWorkspaces from "../testData";
import { Link, useLocation } from "react-router-dom";

const Dashboard = ({ workspaceData }) => {
  const location = useLocation();
  const current_user = location.state.user_id;
  console.log("current user id ", current_user);
  return (
    <div>
      <h1>Welcome to Mind Palace Workspaces Dashboard, User {current_user}!</h1>

      <h2>
        Choose one of your existing workspaces from below or make a new one.
      </h2>

      <div className="container">
        <div className="row">
          {workspaceData.map((workspace) => (
            <div className="col-3" key={workspace.id}>
              <div className="card">
                <img
                  src={workspace.background_default}
                  className="card-img-top"
                  alt="Workspace Background"
                ></img>
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={workspace.name.toLowerCase()}>
                      {workspace.name}
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Outlet context={mockWorkspaces} /> */}
    </div>
  );
};

export default Dashboard;
