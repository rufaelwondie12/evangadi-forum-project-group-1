import axiosBase from "../axios/axiosConfig";

export const getAnswers = async (question_id) => {
  const response = await axiosBase.get(`/answer/getAnswers/${question_id}`);
  return response.data;
};

export const postAnswer = async (question_id, answerContent) => {
  const response = await axiosBase.post("/answer/postAnswer", {
    questionid: question_id,
    answer: answerContent,
  });
  return response.data;
};
