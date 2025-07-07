import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function ChannelHome() {
  const [channel, setChannel] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const fetchChannel = async () => {
    try {
      const response = await fetch("http://localhost:3000/channel");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const channel = await response.json();
      setChannel(channel.data[0]);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  const handleEditVideo = async (videoId, channelId) => {};

  const handleDeleteVideo = async (videoId, channelId) => {
    try {
      let res = await fetch("http://localhost:3000/channel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, channelId }),
      });
      if (res.ok) {
        fetchChannel(); // refresh database:-
        toast.success("Video deleted successfully!");
      }
    } catch (err) {
      console.log("Error: ", err);
      toast.error("Sorry! your video can't be deleted");
    }
  };

  return (
    <>
      <div className="videos md:w-[90%] w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 px-1 perspective-normal perspective-origin-top">
        {channel.videos?.length > 0 ? (
          channel.videos.map((video, index) => {
            return (
              <div
                onClick={(e) => {
                  if (e.target.closest(".menu_btn")) {
                    return;
                  }
                  navigate("/channel-player", {
                    state: { video: video, profilePic: channel.profilePic },
                  });
                }}
                className="card flex flex-col gap-2 cursor-pointer shadow rounded-lg hover:translate-z-1"
              >
                <div className="w-full">
                  <img
                    className="w-full rounded-lg"
                    src={`http://localhost:3000${video.thumbnail}`}
                    alt="video-thumbnail"
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{video.title}</h3>
                    <div
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                      }}
                      onMouseLeave={() => {
                        setHoveredIndex(null);
                      }}
                      className="relative menu_btn"
                    >
                      <img
                        className="w-full h-full cursor-pointer"
                        src="../src/assets/menu.svg"
                        alt="menu_btn"
                      />
                      {hoveredIndex === index && (
                        <div className="absolute top-0 left-0 z-10 w-max flex flex-col items-center justify-center gap-1 shadow rounded-lg px-2 py-1 bg-white">
                          <button
                            type="button"
                            onClick={() => {
                              handleEditVideo(video.videoId);
                            }}
                            className="w-full rounded px-2 py-1 cursor-pointer hover:bg-slate-400"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              handleDeleteVideo(video._id, channel._id);
                            }}
                            className="w-full rounded px-2 py-1 cursor-pointer hover:bg-slate-400"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2.5 text-sm text-gray-500 mt-1.5">
                    <p>{video.views} views</p>
                    <p>{video.uploadDate.split("T")[1].slice(0, -1)} ago</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h2>No videos Uploaded</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default ChannelHome;
