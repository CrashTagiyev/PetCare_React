import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage.jsx";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    setUser(data);
    navigate("/", { replace: true });
  };

  

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/", { replace: true });
  };
  
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      setUser,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
