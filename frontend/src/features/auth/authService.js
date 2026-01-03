import axiosBase from "@/services/axiosConfig";

export const loginUser = async (loginData) => {
  try {
    const response = await axiosBase.post("/users/login", loginData);

    // If the backend returns { token, username }
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    // Standardizing the error message for the whole team
    const message =
      error.response?.data?.msg || "Login failed. Please try again.";
    throw new Error(message);
  }
};
export const registerUser = async (userData) => {
  try {
    const response = await axiosBase.post("/users/register", userData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.msg || "Registration failed.";
    throw new Error(message);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  // to force a page reload here to clear the React state
  window.location.href = "/login";
};
