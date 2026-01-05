import QuestionForm from "../../features/questions/QuestionForm/QuestionForm";
import { useEffect } from "react";
const AskQuestion = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     localStorage.setItem(
  //       "token",
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh4eHgiLCJ1c2VyaWQiOjIsImlhdCI6MTc2NzY0MTM4MywiZXhwIjoxNzY3NzI3NzgzfQ.v4l2bbI96a06WYUNC9RKeMPu0cg6IDxzY_-tIIYQoYg"
  //     );
  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({ username: "xxxx", userid: 2 })
  //     );
  //   }
  // }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <QuestionForm />
    </div>
  );
};

export default AskQuestion;
