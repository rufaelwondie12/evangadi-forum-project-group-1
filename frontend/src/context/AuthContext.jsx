import { createContext, useContext, useState, useEffect } from "react";
import axiosBase from "../services/axiosConfig";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axiosBase.get("/user/checkUser");

      setUser(data);
    } catch (error) {
      console.log("Auth check failed:", error.response?.data?.msg);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (loginData) => {
    const data = await loginUser(loginData);
    // After loginUser saves the token, we update the user state
    setUser(data.user || data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
