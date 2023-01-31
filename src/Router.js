import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Workspace from "./components/Workspace";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/ErrorPage";
import { mockWorkspaces, mockTasks } from "./testData";

export const routes = [
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Login />,
    path: "/signup",
  },
  {
    element: <Dashboard workspaceData={mockWorkspaces} />,
    path: "/workspaces",
    // children: [
    //   {
    //     element: <Workspace />,
    //     path: ":workspaceName",
    //   },
    // ],
  },
  {
    element: <Workspace workspaceData={mockWorkspaces} taskData={mockTasks} />,
    path: "workspaces/:workspaceName",
  },
  {
    element: <Navigate to="/error" replace />,
    path: "*",
  },
  {
    element: <ErrorPage />,
    path: "/error",
  },
];
