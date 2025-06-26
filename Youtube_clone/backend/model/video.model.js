import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: [true, "Can not insert the data because videoId is empty!"],
  },
  title: {
    type: String,
    required: [true, "Can not insert the data because video title is empty!"],
  },
  thumbnails: {
    type: Object,
    required: [true, "Can not insert the data because thumbnailUrl is empty!"],
  },
  description: {
    type: String,
    default: "No description available",
    required: [true, "Can not insert the data because description is empty!"],
  },
  player: {
    type: Object,
    required: [true, "Can not insert the data beacause player is empty!"],
  },
  channelId: {
    type: String,
  },
  channel_avatar: {
    type: String,
  },
  channelName: {
    type: String,
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
  },
  commentCount: {
    type: Number,
  },
  comments: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
  },
});

const videos = mongoose.model("videos", VideoSchema);

export default videos;
