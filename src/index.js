import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FirebaseProvider } from "./FirebaseContext";

import "./index.scss";
import App from "./App";
import Requests from "./components/requests/Requests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/requests",
    element: <Requests />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>
);
