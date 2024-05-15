import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateTask from "./pages/CreateTask.jsx";
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";
import store from "./features/store";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <PrivateRoute>
          <Home />
        </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
    {
        path: "/create-task",
        element: (
            <PrivateRoute>
            <CreateTask />
            </PrivateRoute>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
);
