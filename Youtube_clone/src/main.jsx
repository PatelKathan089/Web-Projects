import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import Error from "./pages/Error.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { ToastContainer } from "react-toastify";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import Channel from "./pages/Channel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <Error />,
  },
  {
    path: "/video-player",
    element: <VideoPlayer />,
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
    path: "/channel",
    element: <Channel />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
