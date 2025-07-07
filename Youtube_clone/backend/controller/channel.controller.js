import channel from "../model/channel.model.js";
import mongoose from "mongoose";

export const createChannel = async (req, res) => {
  const { channelName, channelHandle, channelDescription } = req.body;

  // Create profileImg object
  const userImg = req.file;

  let profileImg;
  if (userImg) {
    profileImg = `uploads/${req.file.filename}`;
  } else {
    profileImg = `https://cdn-icons-png.flaticon.com/512/9187/9187604.png`;
  }

  try {
    const newChannel = new channel({
      name: channelName,
      handle: `@${channelHandle}`,
      description: channelDescription,
      profilePic: profileImg,
    });
    await newChannel.save();
    return res
      .status(200)
      .json({ msg: "Your channel has been created successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Server's internal error!", error: err });
  }
};

export const addChannelContent = async (req, res) => {
  const { channelHandle, title, description } = req.body;

  const bannerFile = req.files["banner-img"]?.[0];
  const videoFile = req.files["video"]?.[0];
  const thumbnailFile = req.files["thumbnail"]?.[0];

  try {
    const foundChannel = await channel.findOne({ handle: channelHandle });
    if (!foundChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    // If only bannerImage is provided:-
    if (bannerFile && !videoFile && !thumbnailFile) {
      const bannerUrl = `/uploads/${bannerFile.filename}`;
      foundChannel.bannerImg = bannerUrl;

      await foundChannel.save();
      return res
        .status(200)
        .json({ msg: "Banner image uploaded successfully." });
    }

    // If only Video and Thumbnail are provided:-
    if (videoFile && thumbnailFile && title && description) {
      const videoUrl = `/uploads/${videoFile.filename}`;
      const thumbnailUrl = `/uploads/${thumbnailFile.filename}`;

      const newVideo = {
        title,
        thumbnail: thumbnailUrl,
        description,
        player: videoUrl,
      };

      foundChannel.videos.push(newVideo);
      await foundChannel.save();
      return res.status(201).json({ msg: "Video uploaded successfully." });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ msg: "Server's internal error", error: err });
  }
};

export const getChannel = async (req, res) => {
  try {
    const data = await channel.find({});
    if (!data) {
      return res.status(404).json({ msg: "Data not found!" });
    }
    return res
      .status(200)
      .json({ msg: "Channel's data sended successfully.", data: data });
  } catch (err) {
    return res.status(500).json({ msg: "Server's internal error", error: err });
  }
};

export const deleteVideo = async (req, res) => {
  const { videoId, channelId } = req.body;

  try {
    const Channel = await channel.findById(channelId);

    if (!Channel) {
      return res.status(404).send("Channel not found!");
    }

    Channel.videos = Channel.videos.filter((video) => {
      return video._id.toString() !== videoId;
    });

    await Channel.save();
    return res.status(200).send("video deleted successfully");
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Server's internal error!", error: err });
  }
};
