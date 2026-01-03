import axiosBase from "../../services/axiosConfig";

export const getAnswers = async (questionId) => {
  const response = await axiosBase.get(`/answers/${questionId}`);
  return response.data.answers;
};

export const postAnswer = async (questionId, content) => {
  const token = localStorage.getItem("token");
  const response = await axiosBase.post(
    "/answers",
    { questionId, answer: content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
