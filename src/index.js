import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NotesPage from "./components/NotesPage";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Setting from "./components/Setting";
import ToDoPage from "./components/ToDoPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const ProtectedRoute = ({ redirectPath = "/auth", children }) => {
  const user = window.localStorage.getItem("user");
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const ProtectedAuthRoute = ({ redirectPath = "/dashboard", children }) => {
  const user = window.localStorage.getItem("user");
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "auth",
    element: (
      <ProtectedAuthRoute>
        <Outlet />
      </ProtectedAuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "reset-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <NotesPage />,
      },
      {
        path: "todo",
        element: <ToDoPage />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
