import axiosBase from "../../services/axiosConfig";

export const loginUser = async (loginData) => {
  try {
    const response = await axiosBase.post("/user/login", loginData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.msg || "Login failed. Please try again.";
    throw new Error(message);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosBase.post("/user/register", userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Registration failed.";
    throw new Error(message);
  }
};

export const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const response = await axiosBase.get("/user/checkUser", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Ensure we don't return undefined if the response is empty (304)
    return response.data || { token };
  } catch (error) {
    localStorage.removeItem("token");
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
