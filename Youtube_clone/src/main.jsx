import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import Error from "./pages/Error.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import CreateChannel from "./components/CreateChannel.jsx";
import Channel from "./pages/Channel.jsx";
import ChannelPlayer from "./pages/ChannelPlayer.jsx";
import ChannelHome from "./components/ChannelHome.jsx";
import ChannelAddVideos from "./components/ChannelAddVideos.jsx";

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
    path: "/create-channel",
    element: <CreateChannel />,
  },
  {
    path: "/channel",
    element: <Channel />,
    children: [
      {
        path: "home",
        element: <ChannelHome/>
      },
      {
        path: "addVideos",
        element: <ChannelAddVideos/>
      }
    ]
  },
  {
    path: "/channel-player",
    element: <ChannelPlayer />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
