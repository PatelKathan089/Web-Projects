import { getVideos } from "../controller/videos.controller.js";

export const videosRoute = (app) => {
  app.get("/videos", getVideos);
};
