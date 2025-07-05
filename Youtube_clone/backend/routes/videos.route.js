import {
  addComments,
  deleteComments,
  editComments,
  getVideos,
} from "../controller/videos.controller.js";

export const videosRoute = (app) => {
  app.get("/videos", getVideos);
  app.post("/videos", addComments);
  app.put("/videos", editComments);
  app.delete("/videos", deleteComments);
};
