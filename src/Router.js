import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import WorkspacePage from "./Pages/WorkspacePage";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/ErrorPage";

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
    element: <Dashboard />,
    path: "/workspaces",
    children: [
      {
        element: <WorkspacePage />,
        path: ":workspaceName",
      },
    ],
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
