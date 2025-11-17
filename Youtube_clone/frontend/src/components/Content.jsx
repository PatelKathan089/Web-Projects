import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useFilter } from "../context/FilterContext";

function Content() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const { filteredVideos } = useFilter();

  useEffect(() => {
    async function getData() {
      let res = await fetch("http://localhost:3000/videos");
      let info = await res.json();
      if (info) {
        setVideos(info.data);
      }
    }
    try {
      getData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleClick = (video) => {
    navigate("/video-player", { state: video });
  };

  return (
    <>
      <div className="w-full h-[calc(100%-56px)] flex flex-col overflow-y-auto">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 sm:px-1.5 grid-rows-1 gap-2.5 px-2 perspective-midrange perspective-origin-top">
          {filteredVideos.length > 0
            ? filteredVideos.map((video) => {
                let views = `${video.views.toString().slice(0, -3)}K`;
                let time = video.uploadDate.split("T")[1].slice(0, -4);
                return (
                  <div
                    onClick={() => {
                      handleClick(video);
                    }}
                    key={video._id}
                    className="card my-2 w-full h-full flex flex-col gap-1.5 hover:cursor-pointer hover:translate-z-2.5"
                  >
                    <div className="w-full h-[210px] rounded-lg">
                      <img
                        className="w-full h-full rounded-lg"
                        src={
                          video.thumbnails.maxres
                            ? video.thumbnails.maxres.url
                            : video.thumbnails.medium.url
                        }
                        alt="thumbnail"
                      />
                    </div>
                    <div className="w-full flex gap-2.5 px-1">
                      <img
                        className="w-[32px] h-[32px] rounded-full"
                        src={video.channel_avatar}
                        alt="Avatar"
                      />
                      <div className="text-sm w-full">
                        <p className="font-semibold">{video.title}</p>
                        <p className="text-gray-600 mt-1">
                          {video.channelName}
                        </p>
                        <div>
                          <span className="text-gray-600">
                            {views} views . {time} ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : videos.map((video) => {
                let views = `${video.views.toString().slice(0, -3)}K`;
                let time = video.uploadDate.split("T")[1].slice(0, -4);
                return (
                  <div
                    onClick={() => {
                      handleClick(video);
                    }}
                    key={video._id}
                    className="card my-2 w-full h-full flex flex-col gap-1.5 hover:cursor-pointer hover:translate-z-2.5"
                  >
                    <div className="w-full h-[210px] rounded-lg">
                      <img
                        className="w-full h-full rounded-lg"
                        src={
                          video.thumbnails.maxres
                            ? video.thumbnails.maxres.url
                            : video.thumbnails.medium.url
                        }
                        alt="thumbnail"
                      />
                    </div>
                    <div className="w-full flex gap-2.5 px-1">
                      <img
                        className="w-[32px] h-[32px] rounded-full"
                        src={video.channel_avatar}
                        alt="Avatar"
                      />
                      <div className="text-sm w-full">
                        <p className="font-semibold">{video.title}</p>
                        <p className="text-gray-600 mt-1">
                          {video.channelName}
                        </p>
                        <div>
                          <span className="text-gray-600">
                            {views} views . {time} ago
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default Content;
