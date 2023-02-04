import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Login/LoginPage";
import RegisterPage from "./components/Login/RegisterPage";
import MainTodoPage from "./components/Todo/MainTodoPage";
import DetailTodo from "./components/Todo/DetailTodo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/todo" element={<MainTodoPage />} />
      <Route path="/detail/:todoId" element={<DetailTodo />} />
    </Routes>
  );
}

export default App;
