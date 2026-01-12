import React from "react";

import LayOut from "../../Components/layOut/Layout";

// Global Components

import ProtectedRoute from "../../Components/ProtectedRoute/ProtectedRoute";

// Pages
import Home from "../Home/Home";
import Landing from "../Landing/Landing";
import AskQuestion from "../AskQuestion/AskQuestion";
import QuestionDetail from "../QuestionDetail/QuestionDetail";
import NotFound from "../NotFound/NotFound";
import AnswerForm from "../../features/answers/AnswerForm";

function Router() {
  return (
    <LayOut>
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question/:questionId"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AnswerForm"
          element={
            <ProtectedRoute>
              <AnswerForm />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Landing />} />
        <Route path="/register" element={<Landing />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayOut>
  );
}

export default Router;
