import axiosBase from "@/services/axiosConfig";

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

export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
