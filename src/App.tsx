import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ChangePassword from "./components/auth/ChangePassword";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import TaskView from "./components/TaskView";
import { AuthProvider } from "./context/authProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskView />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
