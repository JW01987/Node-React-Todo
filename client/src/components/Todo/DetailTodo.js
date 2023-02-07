import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
function DetailTodo() {
  //파라미터로 뚜두 아이디 받아와서 api요청
  let todoId = "63de06218b43a1167bd82643";
  let [todo, setTodo] = useState();
  useEffect(() => {
    axios
      .get(`/api/todo/detail/${todoId}`)
      .then((res) => setTodo(res.data.todoData));
  }, []);
  return (
    <div>
      <div>
        <h1>{todo.title}</h1>
      </div>
    </div>
  );
}

export default Auth(DetailTodo, true);
