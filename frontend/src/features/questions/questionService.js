import axiosBase from "../../services/axiosConfig";

// For Eyerus
export const getAllQuestions = async () => {
  const response = await axiosBase.get("/question/getAllQuestions");
  return response.data;
};

//  using question_id to match your controller
export const getSingleQuestion = async (question_id) => {
  const response = await axiosBase.get(
    `/question/getSingleQuestion/${question_id}`,
  );
  return response.data;
};

// For the Ask Question Form
export const askQuestion = async (title, description, tag) => {
  const response = await axiosBase.post("/question/postQuestion", {
    title,
    description,
    tag,
  });
  return response.data;
};
