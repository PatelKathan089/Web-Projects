import { createContext, useContext, useState } from "react";

const sidebarContext = createContext(null);

const SidebarProvider = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <sidebarContext.Provider value={{ toggleSidebar, setToggleSidebar }}>
      {children}
    </sidebarContext.Provider>
  );
};

const useSidebar = () => {
  return useContext(sidebarContext);
};

export { SidebarProvider, useSidebar };
