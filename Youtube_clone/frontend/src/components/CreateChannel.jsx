import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CreateChannel() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userImg, setUserImg] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  // Using react-hook-form for form handling
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("channelName", data.channelName);
    formData.append("channelHandle", data.channelHandle);
    formData.append("channelDescription",data.channelDescription);
    formData.append("userImg", userImg);
    if (termsAccepted) {
      try {
        let res = await fetch("http://localhost:3000/create-channel", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          navigate("/channel");
          toast.success("Channel created successfully!");
          setUserImg(null);
          setPreviewImg(null);
        } else {
          const errorData = await res.json();
          toast.error(`Error: ${errorData.message}`);
        }
      } catch (err) {
        console.error("Error creating channel:", err);
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <div className="xl:w-1/2 md:w-[70%] w-[90%] flex flex-col shadow shadow-slate-400 rounded-xl p-2">
          <h2 className="xl:text-2xl font-bold">How you'll appear</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-1 my-1"
          >
            <div className="flex flex-col items-center gap-0.5 my-1.5">
              <img
                className="w-[150px] h-[150px] rounded-full"
                src={
                  previewImg ||
                  "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                }
                alt="profile img"
              />
              <div className="relative">
                <input
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setUserImg(file);
                      setPreviewImg(URL.createObjectURL(file));
                    } else {
                      setUserImg(null);
                      setPreviewImg(
                        "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                      );
                    }
                  }}
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <span className="text-blue-600 font-semibold hover:cursor-pointer hover:text-blue-700">
                  select picture
                </span>
              </div>
            </div>
            <div className="md:w-1/2 w-full flex items-center gap-3 my-1.5">
              <label htmlFor="">Name:</label>
              <input
                {...register("channelName")}
                placeholder="Your Channel Name"
                className="w-full border border-gray-400 py-1 px-2 rounded-lg"
                type="text"
              />
            </div>
            <div className="md:w-1/2 w-full flex items-center gap-1 my-1.5">
              <label htmlFor="">Handle:</label>
              <input
                {...register("channelHandle")}
                placeholder="@your_channel_handle"
                className="w-full border border-gray-400 py-1 px-2 rounded-lg"
                type="text"
              />
            </div>
            <div className="md:w-1/2 w-full flex items-center gap-1 my-1.5">
              <label htmlFor="">Description:</label>
              <textarea
                {...register("channelDescription")}
                placeholder="channel description"
                className="w-full border border-gray-400 py-1 px-2 rounded-lg"
                type="text"
              ></textarea>
            </div>
            <div className="flex items-center gap-1 my-1.5 text-sm">
              <input
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                type="checkbox"
                className="cursor-pointer"
              />
              <p>
                By clicking you agree to the terms and conditions for creating
                your channel.
              </p>
            </div>
            <div className="self-end flex items-center gap-2.5 my-1.5 mx-4">
              <button className="text-gray-700 hover:cursor-pointer hover:font-semibold">
                Cancel
              </button>
              <button
                type="submit"
                className="text-blue-700 hover:cursor-pointer hover:font-semibold"
              >
                Create Channel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateChannel;
