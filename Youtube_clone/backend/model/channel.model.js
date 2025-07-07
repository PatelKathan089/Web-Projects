import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handle: { type: String, required: true, unique: true },
  profilePic: { type: String },
  bannerImg: { type: String },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  videos: {
    type: [
      {
        title: {
          type: String,
          required: [
            true,
            "Can not insert the data because video title is empty!",
          ],
        },
        thumbnail: {
          type: String,
          required: [
            true,
            "Can not insert the data because thumbnailUrl is empty!",
          ],
        },
        description: {
          type: String,
          default: "No description available",
          required: [
            true,
            "Can not insert the data because description is empty!",
          ],
        },
        player: {
          type: String,
          required: [true, "Can not insert the data because player is empty!"],
        },
        playlist: {
          type: Array,
          default: [],
        },
        likes: {
          type: Number,
          default: 0,
        },
        views: {
          type: Number,
          default: 0,
        },
        dislikes: {
          type: Number,
          default: 0,
        },
        uploadDate: {
          type: String,
          default: () => new Date().toISOString(),
        },
        commentCount: {
          type: Number,
          default: 0,
        },
        comments: {
          type: Array,
          default: [],
        },
      },
    ],
    default: [],
  },
});

const channel = mongoose.model("channel", ChannelSchema);

export default channel;
