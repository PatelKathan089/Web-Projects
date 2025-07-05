import videos from "../model/video.model.js";
import "dotenv/config";

export const getVideos = async (req, res) => {
  // Fetch comments by the vidoId:-
  const fetchCommentsById = async (videoId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&videoId=${videoId}&key=${process.env.MY_API_KEY}`
      );
      const data = await response.json();
      return (
        data.items?.map((comment) => {
          const snippet = comment.snippet.topLevelComment.snippet;
          return {
            author: snippet.authorDisplayName,
            authorProfileImageUrl: snippet.authorProfileImageUrl,
            text: snippet.textDisplay,
            publishedAt: snippet.publishedAt,
            likeCount: snippet.likeCount,
          };
        }) || []
      );
    } catch (err) {
      console.log(`Failed to fetch comment for vidoId: ${videoId}`, err);
      return [];
    }
  };

  // Fetch playlist by channelId:-
  const fetchPlaylistByChannelId = async (channelId) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?key=${process.env.MY_API_KEY}&part=snippet,contentDetails,player,status,id&maxResults=15&channelId=${channelId}`
      );
      const data = await response.json();

      const playlist = data.items?.map((item) => {
        return {
          playlistId: item.id,
          title: item.snippet?.title,
          description: item.snippet?.description,
          thumbnail: item.snippet?.thumbnails || "",
          itemCount: item.contentDetails?.itemCount,
          player: item.player,
        };
      });
      return playlist || [];
    } catch (err) {
      console.log("Failed to fetch playlist:", err);
      return [];
    }
  };

  // Save All data to my database:-
  const saveVideosToDatabase = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,player&chart=mostPopular&maxResults=25&key=${process.env.MY_API_KEY}`
    );
    const data = await response.json();

    // Extract unique channelIds:-
    const channelIds = [
      ...new Set(data.items.map((item) => item.snippet.channelId)),
    ].join(",");

    // Fetch channel details (avatars)
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.MY_API_KEY}`
    );
    const channelData = await channelRes.json();

    // Create a map of avatar:-
    const avatarMap = {};
    channelData.items.forEach((channel) => {
      avatarMap[channel.id] = channel.snippet?.thumbnails?.default?.url;
    });

    // Create a map of channelName:-
    const channelNameMap = {};
    channelData.items.forEach((channel) => {
      channelNameMap[channel.id] = channel.snippet?.title;
    });

    // return video,avatar,channelName and comments:-
    return Promise.all(
      data.items.map(async (item) => {
        const comments = await fetchCommentsById(item.id);
        const playlists = await fetchPlaylistByChannelId(
          item.snippet?.channelId
        );

        return {
          videoId: item.id,
          title: item.snippet?.title,
          thumbnails: item.snippet?.thumbnails,
          description: item.snippet?.description || "No description available",
          player: item.player,
          channelId: item.snippet?.channelId,
          channel_avatar: avatarMap[item.snippet?.channelId] || "",
          channelName: channelNameMap[item.snippet?.channelId] || "",
          likes: item.statistics?.likeCount || 0,
          views: item.statistics?.viewCount || 0,
          dislikes: item.statistics?.dislikeCount,
          commentCount: item.statistics?.commentCount || 0,
          uploadDate: item.snippet?.publishedAt || "No videos uploaded yet",
          tags: item.snippet?.tags || [],
          comments: comments,
          playlist: playlists,
        };
      })
    );
  };

  // Sending video response from server:-
  try {
    let videoList = await videos.find({});
    if (videoList.length === 0) {
      const fetchVideos = await saveVideosToDatabase();
      for (let video of fetchVideos) {
        try {
          await videos.create(video);
        } catch (err) {
          console.log("Insert Error", err);
        }
      }
      videoList = await videos.find({});
      return res
        .status(200)
        .json({ message: "Data sent successfully", data: videoList });
    } else {
      return res
        .status(200)
        .json({ message: "Data sent successfully", data: videoList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server's Internal Error!", error: err });
  }
};

export const addComments = async (req, res) => {
  const { profilePic, comment, userName, videoId } = req.body;

  try {
    const myVideo = await videos.findOne({ videoId: videoId });

    if (!myVideo) {
      return res.status(404).json({ msg: "Video not found!" });
    }

    myVideo.comments.push({
      author: `@${userName}`,
      authorProfileImageUrl: profilePic,
      text: comment,
      publishedAt: new Date(),
      likeCount: 0,
    });

    await myVideo.save();
    return res.status(201).json({
      msg: "Comment added successfully",
      comment: {
        author: `@${userName}`,
        authorProfileImageUrl: profilePic,
        text: comment,
        publishedAt: new Date(),
        likeCount: 0,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ msg: "Server's internal error!", error: err });
  }
};

export const editComments = async (req, res) => {
  try {
    const { author, videoId, editedComment } = req.body;

    const result = await videos.updateOne(
      { videoId, "comments.author": author }, // match author in comments array
      { $set: { "comments.$.text": editedComment } } // update first match only
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "Comment not found or not updated" });
    }

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { author, videoId } = req.body;

    const video = await videos.findOne({ videoId });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    video.comments = video.comments.filter(
      (comment) => comment.author !== author
    );
    await video.save();

    res.status(200).json({
      msg: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Server error" });
  }
};
