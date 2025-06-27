import React from "react";

function CreateChannel() {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-slate-100">
        <div className="xl:w-1/2 md:w-[70%] w-[90%] flex flex-col shadow shadow-slate-400 rounded-xl p-2">
          <h2 className="xl:text-2xl font-bold">How you'll appear</h2>
          <form className="flex flex-col items-center gap-1 my-1">
            <div className="flex flex-col items-center gap-0.5 my-1.5">
              <img
                className="w-[150px] h-[150px] rounded-full"
                src="./src/assets/userImg.png"
                alt="profile img"
              />
              <div className="relative">
                <input
                  type="file"
                  name=""
                  id=""
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
                placeholder="Your Channel Name"
                className="w-full border border-gray-400 py-1 px-2 rounded-lg"
                type="text"
              />
            </div>
            <div className="md:w-1/2 w-full flex items-center gap-1 my-1.5">
              <label htmlFor="">Handle:</label>
              <input
                placeholder="@your_channel_handle"
                className="w-full border border-gray-400 py-1 px-2 rounded-lg"
                type="text"
              />
            </div>
            <div className="flex items-center gap-1 my-1.5 text-sm">
              <input type="checkbox" className="cursor-pointer" />
              <p>
                By clicking you agree to the terms and conditions for creating
                your channel.
              </p>
            </div>
            <div className="self-end flex items-center gap-2.5 my-1.5 mx-4">
              <button className="text-gray-700 hover:cursor-pointer hover:font-semibold">
                Cancel
              </button>
              <button className="text-blue-700 hover:cursor-pointer hover:font-semibold">
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
