import { registerUsers } from "../controller/register.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({storage});

export const registerRoute = (app) => {
  app.post("/register", upload.single('profilePicture'), registerUsers);
};
