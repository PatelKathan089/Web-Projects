import { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
  const [searchString, setSearchString] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);
  return (
    <>
      <FilterContext.Provider
        value={{
          searchString,
          setSearchString,
          filteredVideos,
          setFilteredVideos,
        }}
      >
        {children}
      </FilterContext.Provider>
    </>
  );
}

const useFilter = () => {
  return useContext(FilterContext);
};

export { FilterProvider, useFilter };
