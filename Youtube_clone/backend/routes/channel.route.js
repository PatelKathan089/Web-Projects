import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getChannel,
  addChannelContent,
  createChannel,
  deleteVideo,
} from "../controller/channel.controller.js";

const uploadPath = "./uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + extension); // unique file name for different files
  },
});
const upload = multer({ storage: storage });

export const channelRoutes = (app) => {
  app.get("/channel", getChannel);
  app.post("/create-channel", upload.single("userImg"), createChannel);
  app.post(
    "/channel",
    upload.fields([
      {
        name: "banner-img",
        maxCount: 1,
      },
      {
        name: "video",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    addChannelContent
  );
  app.delete("/channel", deleteVideo);
};
