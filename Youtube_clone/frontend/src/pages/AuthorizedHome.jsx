import React from "react";
import { SidebarProvider } from "../context/SidebarContext";
import { SearchProvider } from "../context/SearchContext";
import Header2 from "../components/Header2";
import Sidebar2 from "../components/Sidebar2";
import Main from "../components/Main";
import { FilterProvider } from "../context/FilterContext";

function AuthorizedHome() {
  return (
    <>
      <FilterProvider>
        <SidebarProvider>
          <SearchProvider>
            <Header2 />
          </SearchProvider>
          <div className="w-full h-[calc(100vh-56px)] flex gap-5">
            <Sidebar2 />
            <Main />
          </div>
        </SidebarProvider>
      </FilterProvider>
    </>
  );
}

export default AuthorizedHome;
