import { useState, useEffect } from "react";
import { SidebarProvider } from "../context/SidebarContext";
import { SearchProvider } from "../context/SearchContext";
import Header2 from "../components/Header2";
import Sidebar2 from "../components/Sidebar2";
import Player from "../components/Player";
import { FilterProvider } from "../context/FilterContext";

function VideoPlayer() {
  const [display, setDisplay] = useState(false);
  return (
    <>
      <FilterProvider>
        <SidebarProvider>
          <SearchProvider>
            <Header2 display={display} toggleDisplay={setDisplay} />
          </SearchProvider>
          <div className="w-full h-[calc(100vh-56px)] overflow-y-auto flex gap-5">
            <div
              className={
                display
                  ? "h-[calc(100vh-56px)] block xl:absolute xl:z-10 xl:bg-slate-100 overflow-y-auto"
                  : "hidden"
              }
            >
              <Sidebar2 />
            </div>
            <Player />
          </div>
        </SidebarProvider>
      </FilterProvider>
    </>
  );
}

export default VideoPlayer;
