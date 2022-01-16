import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/auth/SignUp";
import TaskView from "./components/TaskView";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskView />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
