import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Outlet } from "react-router";

function Channel() {
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

  const uploadBanner = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("banner-img", file);
      formData.append("channelHandle", channel.handle);
      const res = await fetch("http://localhost:3000/channel", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast.success("Banner updated successfully!");
        fetchChannel(); // re-fetch channel data:-
      }
    } else {
      toast.info("Please upload the file!");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center gap-3 p-1 box-border">
        <div
          className={
            channel.bannerImg
              ? "md:w-[90%] w-[95%] h-[20%] banner"
              : "md:w-[90%] w-[95%] h-[20%] flex items-center justify-center banner border border-dashed rounded-xl"
          }
        >
          <img
            className={
              channel.bannerImg ? "w-full h-full rounded-xl" : "hidden"
            }
            src={`http://localhost:3000${channel.bannerImg}`}
            alt="banner_image"
          />
          <div className={channel.bannerImg ? "hidden" : "relative"}>
            <button type="button" className="px-2 py-1">
              Upload
            </button>
            <input
              onChange={uploadBanner}
              className="border absolute left-0 top-0 opacity-0"
              type="file"
              name="banner"
              id=""
            />
          </div>
        </div>
        <div className="flex md:flex-row flex-col items-center gap-2.5 md:w-[90%] w-full">
          <div className="w-[150px] h-[150px]">
            <img
              className="w-full h-full rounded-full"
              src={
                channel?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              }
              alt="profile_pic"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{channel.name}</h2>
            <div className="flex gap-1 text-sm text-gray-500">
              <p className="text-gray-500">{channel.handle}</p>
              <p className="text-gray-500">17k subscribers</p>
              <p className="text-gray-500">100k views</p>
            </div>
            <div className="text-sm text-gray-500">
              <span>{channel.description}</span>
              {channel.description?.length > 15 && (
                <span className="ml-1">...more</span>
              )}
            </div>
            <div className="text-sm">
              <a className="text-blue-600 hover:underline" href="">
                xyz.com
              </a>
            </div>
            <button className="w-max self-center md:self-start bg-black text-white px-4 py-1 my-1 rounded-full cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
        <nav className="md:w-[90%] w-full flex gap-2.5 mt-1 text-gray-700">
          <NavLink
            to={"/channel/home"}
            className={({ isActive }) => {
              return isActive ? "font-semibold underline" : "font-normal";
            }}
          >
            Home
          </NavLink>
          <NavLink
            to={"/channel/addVideos"}
            className={({ isActive }) => {
              return isActive ? "font-semibold underline" : "font-normal";
            }}
          >
            addVideos
          </NavLink>
        </nav>
        <div className="md:w-[90%] w-[95%] border border-gray-300"></div>
        <Outlet />
      </div>
    </>
  );
}

export default Channel;
