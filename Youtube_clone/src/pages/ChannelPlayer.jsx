import { useRef } from "react";
import { useLocation } from "react-router";

function ChannelPlayer() {
  const commentInputRef = useRef(null);
  const commentBtnRef = useRef(null);

  const commentFocus = () => {
    commentBtnRef.current.classList.replace("bg-stone-300/60", "bg-blue-500");
    commentBtnRef.current.classList.replace("hidden", "block");
  };

  const commentBlur = () => {
    commentBtnRef.current.classList.replace("bg-blue-500", "bg-stone-300/60");
  };

  const location = useLocation();
  const videoInfo = location.state.video;
  const profilePic = location.state.profilePic;

  return (
    <>
      <section className="w-full flex justify-center">
        <div className="card w-[95%] flex flex-col gap-2 mt-2.5">
          {/* ...................Video section..................................... */}
          <div className="w-full h-[55vh] rounded">
            <video className="w-full h-full rounded" controls>
              <source
                type="video/mp4"
                src={`http://localhost:3000${videoInfo.player}`}
              ></source>
            </video>
          </div>
          {/* ...................Video details section..................................... */}
          <div className="w-full flex flex-col">
            <div className="flex flex-col gap-1 w-full p-1">
              <h3 className="md:text-xl text-lg font-bold">
                {videoInfo.title}
              </h3>
              <div className="flex justify-between items-center md:pr-0 py-1.5 pr-2.5 w-full">
                <div className="md:w-auto xl:gap-2 lg:gap-0 flex items-center gap-2.5 w-full">
                  <img
                    className="md:w-[40px] md:h-[40px] w-[32px] h-[32px] rounded-full"
                    src={profilePic}
                    alt="avatar"
                  />
                  <div className="flex md:flex-col md:gap-0 md:items-start flex-row items-center gap-1.5">
                    <span className="md:text-lg text-sm font-medium">
                      {videoInfo.channelName}
                    </span>
                    <span className="md:inline hidden text-sm text-gray-500">
                      407M subscribers
                    </span>
                    <span className="md:hidden inline text-[12px] text-gray-500">
                      407M
                    </span>
                  </div>
                  <button className="md:self-end md:ml-1.5 md:px-4 md:py-2 md:text-base ml-auto text-sm px-3 py-1.5 rounded-full bg-black text-white hover:cursor-pointer">
                    Subscribe
                  </button>
                </div>

                <div className="self-end md:flex hidden gap-1 mr-2">
                  <div className="">
                    <button className="px-2.5 py-1 bg-slate-100 rounded-l-full hover:cursor-pointer hover:bg-slate-200">
                      <i className="fa-regular fa-thumbs-up"></i>
                      <span className="ml-1.5">3.6 M</span>
                    </button>
                    <button className="px-2 pr-3 py-1 bg-slate-100 rounded-r-full border-s border-s-slate-300 hover:cursor-pointer hover:bg-slate-200">
                      <i className="fa-regular fa-thumbs-down"></i>
                    </button>
                  </div>
                  <button className="bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:cursor-pointer hover:bg-slate-200">
                    <i className="fa-solid fa-share"></i>
                    <span>Share</span>
                  </button>
                  <button className="bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:cursor-pointer hover:bg-slate-200">
                    <i className="fa-solid fa-arrow-down"></i>
                    <span>Download</span>
                  </button>
                  <button className="bg-slate-100 px-2 py-1 rounded-full flex items-center gap-1.5 hover:cursor-pointer hover:bg-slate-200">
                    <i className="fa-solid fa-ellipsis"></i>
                  </button>
                </div>
              </div>
              {/* ............This section will appear only on mobile devices........... */}
              <div className="md:hidden w-full flex mt-1.5 justify-between">
                <div className="">
                  <button className="px-2.5 py-1 bg-slate-100 rounded-l-full hover:cursor-pointer hover:bg-slate-200">
                    <i className="fa-regular fa-thumbs-up"></i>
                    <span className="ml-1.5">3.6 M</span>
                  </button>
                  <button className="px-2 pr-3 py-1 bg-slate-100 rounded-r-full border-s border-s-slate-300 hover:cursor-pointer hover:bg-slate-200">
                    <i className="fa-regular fa-thumbs-down"></i>
                  </button>
                </div>
                <button className="bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:cursor-pointer hover:bg-slate-200">
                  <i className="fa-solid fa-share"></i>
                  <span>Share</span>
                </button>
                <button className="bg-slate-100 px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:cursor-pointer hover:bg-slate-200">
                  <i className="fa-solid fa-arrow-down"></i>
                  <span>Download</span>
                </button>
                <button className="bg-slate-100 px-2 py-1 rounded-full flex items-center gap-1.5 hover:cursor-pointer hover:bg-slate-200">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
            </div>
          </div>
          {/* ...................Description section..................................... */}
          <div className="bg-stone-200/60 w-full flex flex-col gap-1.5 p-1 rounded-lg shadow shadow-stone-400">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <span>{videoInfo.views} views</span>
              <span>{videoInfo.uploadDate}</span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <p className="text-sm">{videoInfo.description.split("\n")[0]}</p>
              <p className="text-sm">
                {videoInfo.description.split("\n")[2]}
                <span className="font-semibold mx-1">...more</span>
              </p>
            </div>
          </div>
          {/* ...................... Comment Section ........................ */}
          {videoInfo.comment ? (
            <div className="flex flex-col md:text-base gap-2.5 p-1 mt-2">
              <h2 className="font-semibold text-lg">
                {videoInfo.commentCount} Comments
              </h2>
              <div className="flex px-2.5 items-center gap-4">
                <img
                  className="w-[40px] h-[40px] rounded-full bg-slate-200"
                  src={localStorage.getItem("avatar")}
                  alt="profile_avatar"
                />
                <div className="flex flex-col gap-1.5 w-full">
                  <input
                    onFocus={commentFocus}
                    onBlur={commentBlur}
                    ref={commentInputRef}
                    className="w-full px-2 py-1 focus:outline-0 border-b border-b-gray-400 focus:border-b-black"
                    type="text"
                  />
                  <button
                    ref={commentBtnRef}
                    className="self-end hidden px-3 py-1 mx-1.5 rounded-full hover:cursor-pointer bg-stone-300/60"
                  >
                    Comment
                  </button>
                </div>
              </div>
              <div className="md:flex hidden flex-col gap-2.5 mt-4 p-2.5">
                {videoInfo.comments.map((comment, index) => {
                  return (
                    <div key={comment._id} className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-[40px] h-[40px] bg-slate-200 rounded-full"
                          src={comment?.authorProfileImageUrl}
                          alt="author_profile-imgage"
                        />
                        <div className="flex flex-col gap-0.5">
                          <span className=" text-sm font-semibold">
                            {comment.author}
                          </span>
                          <span className="">{comment.text}</span>
                          <div className="flex items-center gap-3.5">
                            <button className="hover:cursor-pointer">
                              <i className="fa-regular fa-thumbs-up rounded-full p-1 hover:bg-gray-200"></i>
                              <span className="ml-1 text-gray-400">
                                {comment.likeCount}
                              </span>
                            </button>
                            <button className="rounded-full hover:bg-gray-200 hover:cursor-pointer">
                              <i className="fa-regular fa-thumbs-down rotate-180 rotate-x-180"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <img src="./src/assets/menu.svg" alt="options" />
                    </div>
                  );
                })}
              </div>
              {/* .............This section will appear only on mobile devices........... */}
              <div className="md:hidden text-[12px] flex flex-col gap-2.5 mt-4 p-2.5 bg-stone-300/50 shadow shadow-stone-300 rounded-lg">
                <div className="flex justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-[32px] h-[32px] bg-slate-100 rounded-full"
                      src={videoInfo.comments[0].authorProfileImageUrl}
                      alt="author_profile-imgage"
                    />
                    <div className="flex flex-col gap-0.5">
                      <span className=" text-sm font-semibold">
                        {videoInfo.comments[0].author}
                      </span>
                      <span className="">{videoInfo.comments[0].text}</span>
                      <div className="flex items-center gap-3.5">
                        <button className="hover:cursor-pointer">
                          <i className="fa-regular fa-thumbs-up rounded-full p-1 hover:bg-gray-200"></i>
                          <span className="ml-1 text-gray-400">
                            {videoInfo.comments[0].likeCount}
                          </span>
                        </button>
                        <button className="rounded-full hover:bg-gray-200 hover:cursor-pointer">
                          <i className="fa-regular fa-thumbs-down rotate-180 rotate-x-180"></i>
                        </button>
                        <button className="hover:cursor-pointer font-semibold">
                          More...
                        </button>
                      </div>
                    </div>
                  </div>
                  <img src="./src/assets/menu.svg" alt="options" />
                </div>
              </div>
            </div>
          ) : (
            <p>No comment available</p>
          )}
        </div>
      </section>
    </>
  );
}

export default ChannelPlayer;
