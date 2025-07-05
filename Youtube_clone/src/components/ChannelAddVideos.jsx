import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/inputFileStyle.css";
import { toast } from "react-toastify";

function ChannelAddVideos() {
  const [channel, setChannel] = useState({});
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("channelHandle", channel.handle);
    formData.append("video", video);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("title", title);

    try {
      const res = await fetch("http://localhost:3000/channel", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        navigate('/channel/home');
        toast.success("video uploaded successfully!")
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Sorry, unfortunatly your video can't be uploaded");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center p-1.5">
        <form
          className="md:w-[70%] w-full flex flex-col gap-4 rounded-lg shadow shadow-stone-500 bg-stone-300/20 p-2.5"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center gap-2.5">
            <label htmlFor="">Video:</label>
            <input
              className="ml-8"
              type="file"
              accept="video/*"
              onChange={(e) => {
                setVideo(e.target.files[0]);
              }}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <label htmlFor="">Thumbnail:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
              }}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <label htmlFor="">Video Title:</label>
            <input
              type="text"
              className="w-[70%] ml-1 px-2 py-1 border border-gray-400 rounded"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <label htmlFor="">Description:</label>
            <textarea
              className="w-[70%] h-[10vh] px-1 border border-gray-400 rounded"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="w-max self-center">
            <button
              className="px-2 py-1 rounded bg-stone-400/70 cursor-pointer hover:outline hover:bg-stone-400"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChannelAddVideos;
