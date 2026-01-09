import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "./App.css";

import Loader from "./Components/Loader/Loader";

import Router from "./Pages/Router/Router";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return <Router />;
}

export default App;
