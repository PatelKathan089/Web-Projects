import { useState, createContext, useContext } from "react";

const SearchContext = createContext(null);

const SearchProvider = ({ children }) => {
  const [toggleSearch, setToggleSearch] = useState(false);
  return (
    <>
      <SearchContext.Provider value={{ toggleSearch, setToggleSearch }}>
        {children}
      </SearchContext.Provider>
    </>
  );
};

const useSearch = () => {
  return useContext(SearchContext);
};

export { SearchProvider, useSearch };
