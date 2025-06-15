import { useSidebar } from "../context/SidebarContext";
import { NavLink } from "react-router";

function Sidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <div
        className={
          toggleSidebar
            ? "w-[230px] p-[8px] h-full block translate-x-0 xl:block xl:translate-x-[0%] overflow-y-auto scrollbar-thin absolute z-10 bg-slate-50 xl:static xl:bg-transparent"
            : "w-[230px] p-[8px] h-full hidden -translate-x-full xl:block xl:translate-x-[0%] overflow-y-auto scrollbar-thin"
        }
      >
        <div className="px-[9px]">
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/home.svg" alt="home_icon" />
            </div>
            <span className="">Home</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/shorts.svg" alt="shorts_icon" />
            </div>
            <span className="">Shorts</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/subscription.svg"
                alt="subscription_icon"
              />
            </div>
            <span className="">Subscription</span>
          </div>
        </div>

        <hr className="text-gray-300 xl:block lg:hidden" />

        <div className="px-[9px] my-2">
          <div className="flex flex-row items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/user1.svg" alt="user_icon" />
            </div>
            <span className="">You</span>
          </div>
          <div className="flex flex-row items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/history.svg" alt="history_icon" />
            </div>
            <span className="">History</span>
          </div>
        </div>

        <hr className="text-gray-300" />

        <div className="px-[9px] my-2">
          <div className="flex items-center justify-center gap-6 p-1 mx-1 my-2">
            <span className="">
              Sign in to like videos, comment, and subscribe.
            </span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2">
            <NavLink
              to={"/login"}
              className="border border-gray-200 rounded-full hover:cursor-pointer hover:bg-blue-100"
            >
              <div className="flex items-center gap-1.5 py-1.5 px-2.5">
                <img src="./src/assets/user.svg" alt="user" />
                <span className="text-blue-600 font-medium">Sign in</span>
              </div>
            </NavLink>
          </div>
        </div>

        <hr className="text-gray-300" />

        <div className="px-[9px] my-2">
          <h2 className="font-bold text-lg">Explore</h2>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/trending.svg"
                alt="trending_icon"
              />
            </div>
            <span className="">Trending</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/shopping.svg"
                alt="shopping_icon"
              />
            </div>
            <span className="">Shopping</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/music.svg" alt="music_icon" />
            </div>
            <span className="">Music</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/movies.svg" alt="movies_icon" />
            </div>
            <span className="">Movies</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/live.svg" alt="live_icon" />
            </div>
            <span className="">Live</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/gaming.svg" alt="gaming_icon" />
            </div>
            <span className="">Gaming</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/news.svg" alt="news_icon" />
            </div>
            <span className="">News</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/sports.svg" alt="sports_icon" />
            </div>
            <span className="">Sports</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/courses.svg" alt="courses_icon" />
            </div>
            <span className="">Courses</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/fashion.svg"
                alt="fashion & beauty_icon"
              />
            </div>
            <span className="">Fashion & Beauty</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/podcast.svg" alt="podcasts_icon" />
            </div>
            <span className="">Podcasts</span>
          </div>
        </div>

        <hr className="text-gray-300" />

        <div className="px-[9px] my-2">
          <h2 className="font-bold text-lg">More From Youtube</h2>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/yt_premium.svg"
                alt="yt_premium_icon"
              />
            </div>
            <span>Youtube Premium</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/yt_music.svg"
                alt="yt_music_icon"
              />
            </div>
            <span>Youtube Music</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/yt_kids.svg" alt="yt_kids_icon" />
            </div>
            <span>Youtube Kids</span>
          </div>
        </div>

        <hr className="text-gray-300" />

        <div className="px-[9px] my-2">
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/setting.svg" alt="settings_icon" />
            </div>
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/report.svg" alt="report_icon" />
            </div>
            <span>Report History</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img src="./src/assets/sidebar/help.svg" alt="help_icon" />
            </div>
            <span>Help</span>
          </div>
          <div className="flex items-center gap-6 p-1 mx-1 my-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <div>
              <img
                src="./src/assets/sidebar/feedback.svg"
                alt="feedback_icon"
              />
            </div>
            <span>Send Feedback</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex xl:hidden flex-col w-[80px]">
        <div className="flex flex-col gap-1 items-center my-2.5">
          <img src="./src/assets/sidebar/home.svg" alt="home_icon" />
          <p className="text-[10px]">Home</p>
        </div>
        <div className="flex flex-col gap-1 items-center my-2.5">
          <img src="./src/assets/sidebar/shorts.svg" alt="shorts_icon" />
          <p className="text-[10px]">Shorts</p>
        </div>
        <div className="flex flex-col gap-1 items-center my-2.5">
          <img
            src="./src/assets/sidebar/subscription.svg"
            alt="subscription_icon"
          />
          <p className="text-[10px]">Subscription</p>
        </div>
        <div className="flex flex-col gap-1 items-center my-2.5">
          <img src="./src/assets/sidebar/user1.svg" alt="user_icon" />
          <p className="text-[10px]">User</p>
        </div>
        <div className="flex flex-col gap-1 items-center my-2.5">
          <img src="./src/assets/sidebar/history.svg" alt="history_icon" />
          <p className="text-[10px]">History</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
