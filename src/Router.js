import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Workspace from "./Pages/Workspace";
import Dashboard from "./Pages/Dashboard";
import ErrorPage from "./Pages/ErrorPage";

export const routes = [
  {
    element: <Home />,
    path: "/home",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Dashboard />,
    path: "/dashboard",
    children: [
      {
        element: <Workspace />,
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
