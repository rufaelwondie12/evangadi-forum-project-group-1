import QuestionForm from "../../features/questions/QuestionForm/QuestionForm";

const AskQuestion = () => {
  // if (!localStorage.getItem("token")) {
  //   localStorage.setItem(
  //     "token",
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsInVzZXJpZCI6NywiaWF0IjoxNzY3NTU2NzcwLCJleHAiOjE3Njc2NDMxNzB9.KcdejqDl5oqnGFtpDZmvI0w2ZXzjS0_n3y0Pqs_fkmQ"
  //   );
  //   localStorage.setItem(
  //     "user",
  //     JSON.stringify({ username: "testuser", userid: 7 })
  //   );
  // }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <QuestionForm />
    </div>
  );
};

export default AskQuestion;
