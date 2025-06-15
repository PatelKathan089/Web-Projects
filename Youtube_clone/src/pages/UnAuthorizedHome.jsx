import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";
import { SearchProvider } from "../context/SearchContext";

function UnAuthorizedHome() {
  return (
    <>
      <SidebarProvider>
        <SearchProvider>
          <Header />
        </SearchProvider>
        <div className="w-full h-[calc(100vh-56px)] flex">
          <Sidebar />
          <div
            className={
              "xl:w-[calc(100%-230px)] lg:w-[calc(100%-80px)] w-full h-full flex justify-center py-8"
            }
          >
            <div className="w-[90%] md:w-[65%] h-max flex flex-col gap-3 items-center p-4 rounded-lg shadow-lg shadow-slate-300">
              <h2 className="font-bold text-center text-2xl">
                Try searching to get started
              </h2>
              <p className="text-center">
                Start watching videos to help us build a feed of videos you'll
                love
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default UnAuthorizedHome;
