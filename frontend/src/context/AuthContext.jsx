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
      const { data } = await axiosBase.get("/users/checkUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.log("Auth check failed:", error.response?.data?.msg);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login handler that components will call
  const login = async (loginData) => {
    // 1. Call the API service
    const data = await loginUser(loginData);

    // 2. Update the global state with user info

    setUser(data.user || data); //to save the user's name or ID into the AuthContext

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token"); // Clears the storage
    setUser(null); // Resets global state
    navigate("/login"); // Redirects to login page
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
