import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function ChannelHome() {
  const [channel, setChannel] = useState({});
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
  return (
    <>
      <div className="videos md:w-[90%] w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 px-1 perspective-normal perspective-origin-top">
        {channel.videos?.length > 0 ? (
          channel.videos.map((video) => {
            return (
              <div
                onClick={() => {
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
                    <div className="cursor-pointer w-[20px] h-[20px]">
                      <img
                        className="w-full h-full"
                        src="../src/assets/menu.svg"
                        alt="menu_btn"
                      />
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
