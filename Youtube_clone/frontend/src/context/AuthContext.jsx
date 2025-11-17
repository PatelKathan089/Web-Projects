import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Applying sideEffect for getting token:-
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
