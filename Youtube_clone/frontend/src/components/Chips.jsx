import { useRef, useState } from "react";
import { useEffect } from "react";
import "../App.css";

function Chips() {
  const [tags, setTags] = useState([]);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const getVideos = async () => {
      const res = await fetch("http://localhost:3000/videos");
      const videos = await res.json();
      videos.data?.map((item) => {
        if (item.tags && item.tags.length > 10) {
          setTags(item.tags);
        }
      });
    };
    getVideos();
  }, []);

  // Functionality for sliding chips:-
  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
    setShowLeftBtn(true)
  };

  return (
    <>
      <div className="w-full h-[56px] flex items-center gap-2.5 px-1.5 relative">
        {showLeftBtn && (
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute left-0.5 z-10 hover:cursor-pointer hover:bg-slate-300 bg-slate-200 px-1.5 py-0.5 rounded-lg"
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        )}

        <div className="w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto scroll-smooth no-scrollbar whitespace-nowrap"
          >
            <p className="px-2.5 py-1 bg-black text-white rounded-lg">All</p>
            {tags.length > 0 &&
              tags.map((tag, index) => {
                return (
                  <span
                    key={index}
                    className="whitespace-nowrap px-2.5 py-1 text-sm bg-slate-100 hover:cursor-pointer rounded-lg"
                  >
                    {tag}
                  </span>
                );
              })}
          </div>
        </div>

        {showRightBtn && (
          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-0.5 z-10 hover:cursor-pointer hover:bg-slate-300 bg-slate-200 px-1.5 py-0.5 rounded-lg"
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Chips;
