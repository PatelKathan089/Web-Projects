import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Spinner from "./components/Spinner.jsx";
const VideoPlayer = lazy(() => import("./pages/VideoPlayer.jsx"));
const CreateChannel = lazy(() => import("./components/CreateChannel.jsx"));
const Channel = lazy(() => import("./pages/Channel.jsx"));
const ChannelPlayer = lazy(() => import("./pages/ChannelPlayer.jsx"));
const ChannelHome = lazy(() => import("./components/ChannelHome.jsx"));
const ChannelAddVideos = lazy(() =>
  import("./components/ChannelAddVideos.jsx")
);
const Error = lazy(() => import("./pages/Error.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: (
      <Suspense fallback={<Spinner />}>
        <Error />
      </Suspense>
    ),
  },
  {
    path: "/video-player",
    element: (
      <Suspense fallback={<Spinner />}>
        <VideoPlayer />
      </Suspense>
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
    path: "/create-channel",
    element: (
      <Suspense fallback={<Spinner />}>
        <CreateChannel />
      </Suspense>
    ),
  },
  {
    path: "/channel",
    element: (
      <Suspense fallback={<Spinner />}>
        <Channel />
      </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<Spinner />}>
            <ChannelHome />
          </Suspense>
        ),
      },
      {
        path: "addVideos",
        element: (
          <Suspense fallback={<Spinner />}>
            <ChannelAddVideos />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/channel-player",
    element: (
      <Suspense fallback={<Spinner />}>
        <ChannelPlayer />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </StrictMode>
);
