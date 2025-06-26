import { useSearch } from "../context/SearchContext";
import { useSidebar } from "../context/SidebarContext";

function Header2({ display, toggleDisplay }) {
  const { toggleSidebar, setToggleSidebar } = useSidebar();
  const { toggleSearch, setToggleSearch } = useSearch();
  return (
    <>
      <div
        className={
          toggleSearch
            ? "hidden"
            : "w-full h-[56px] px-[16px] box-border flex justify-between items-center"
        }
      >
        {/* -------------------------- Start ------------------------------ */}
        <div className="h-[40px] p-1.5 gap-5 flex items-center">
          <button
            type="button"
            onClick={() => {
              setToggleSidebar(!toggleSidebar);
              toggleDisplay(!display);
            }}
            className="menu flex items-center justify-center p-1.5 hover:cursor-pointer hover:bg-gray-200 hover:rounded-full"
          >
            <div className="w-[24px] h-[24px]">
              <img
                className="w-full h-full"
                src="./src/assets/hamburger.svg"
                alt="hamburger menu"
              />
            </div>
          </button>
          <div className="logo">
            <img src="./src/assets/youtube.svg" alt="YouTube Logo" />
          </div>
        </div>
        {/* -------------------------- Start ------------------------------- */}

        {/* -------------------------- Center ------------------------------ */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex h-[40px] items-center">
            <input
              placeholder="Search"
              className="w-[25vw] h-full px-4 rounded-l-full border border-gray-400 focus:outline-blue-300"
              type="search"
              name=""
              id=""
            />
            <button
              type="button"
              className="px-5 h-full rounded-r-full bg-gray-100 border border-l-0 border-gray-400 hover:cursor-pointer hover:bg-gray-200"
            >
              <img src="./src/assets/search.svg" alt="Search button" />
            </button>
          </div>
          <button className="w-[40px] h-[40px] hidden md:flex items-center justify-center bg-gray-100 rounded-full hover:cursor-pointer hover:bg-gray-200">
            <img
              className="w-[17px] h-[17px]"
              src="./src/assets/microPhone.svg"
              alt="Microphone button"
            />
          </button>
        </div>
        {/* -------------------------- Center ------------------------------ */}

        {/* -------------------------- End --------------------------------- */}
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              setToggleSearch(!toggleSearch);
            }}
            className="p-1 h-full md:hidden hover:cursor-pointer"
          >
            <img src="./src/assets/search.svg" alt="Search button" />
          </button>
          <button className="flex items-center px-1.5 py-1 md:px-2.5 md:py-1.5 gap-1.5 bg-slate-100 rounded-full hover:bg-slate-200 hover:cursor-pointer">
            <div>
              <img src="./src/assets/create.svg" alt="create_btn_icon" />
            </div>
            <span className="text-[12px] md:text-base">Create</span>
          </button>
          <button className="hidden md:block p-2 rounded-full hover:bg-slate-200 hover:cursor-pointer">
            <div>
              <img
                src="./src/assets/notification.svg"
                alt="notification_btn_icon"
              />
            </div>
          </button>
          <div className="flex items-center justify-center p-1 rounded-full hover:cursor-pointer">
            <img
              src={localStorage.getItem("avatar")}
              className="w-[30px] h-[30px] rounded-full"
              alt=""
            />
          </div>
        </div>
        {/* -------------------------- End --------------------------------- */}
      </div>

      {/*------------- Header when it's clicked toggleSearch ----------------*/}
      <div
        className={
          toggleSearch
            ? "w-full h-[56px] px-[16px] box-border flex justify-between items-center"
            : "hidden"
        }
      >
        <button
          type="button"
          onClick={() => {
            setToggleSearch(false);
          }}
          className="w-6 h-6 hover:cursor-pointer"
        >
          <img
            className="w-full h-full"
            src="./src/assets/back.svg"
            alt="back-btn_icon"
          />
        </button>

        <div className="flex h-[40px] items-center">
          <input
            placeholder="Search"
            className="w-full h-full px-4 rounded-l-full border border-gray-400 focus:outline-blue-300"
            type="search"
            name=""
            id=""
          />
          <button
            type="button"
            className="px-5 h-full rounded-r-full bg-gray-100 border border-l-0 border-gray-400 hover:cursor-pointer hover:bg-gray-200"
          >
            <img src="./src/assets/search.svg" alt="Search button" />
          </button>
        </div>
      </div>
      {/*------------- Header when it's clicked toggleSearch ----------------*/}
    </>
  );
}

export default Header2;
