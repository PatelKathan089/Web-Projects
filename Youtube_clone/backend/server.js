import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import { loginRoute } from "./routes/login.route.js";
import { registerRoute } from "./routes/register.route.js";
import { videosRoute } from "./routes/videos.route.js";
import { channelRoutes } from "./routes/channel.route.js";

const app = express();

// Connecting my server to database:-
mongoose.connect(process.env.MONGO_URI);
// Check if my connection to my database is successful or not:-
mongoose.connection.on("open", () => {
  console.log("Your server is connected to your database successfully.");
});
mongoose.connection.on("error", () => {
  console.log("Your server is not connected to your database!");
});

// Sereve my upload folder public:-
app.use("/uploads", express.static("uploads"));

// Body-Parser middleware for parsing json data of req.body:-
app.use(express.json({ limit: "10mb" }));

// Cors middleware for resource sharing across different urls:-
app.use(cors());

// Calling All Routes Here..
loginRoute(app);
registerRoute(app);
videosRoute(app);
channelRoutes(app);

// Start Server:-
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app server is running on http://localhost:${PORT}/`);
});
