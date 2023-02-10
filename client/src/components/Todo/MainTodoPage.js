import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import { Link } from "react-router-dom";

function MainTodoPage({ userData }) {
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    if (userData) {
      axios
        .post("/api/todo/showtodos", { userId: userData._id })
        .then((res) => {
          setTodos(res.data.todoData);
          setLoading(true);
        });
    }
  }, [userData]);

  let [todos, setTodos] = useState([]);

  return (
    <div>
      <h1>뚜두리스트 모임</h1>
      {loading ? (
        todos.map((todo) => {
          return <TodoList todo={todo} />;
        })
      ) : (
        <p>로딩중</p>
      )}
      <Link to="/addtodo">뚜두추가</Link>
    </div>
  );
}

function TodoList({ todo }) {
  return (
    <div key={todo._id}>
      <Link to={`/detail/${todo._id}`}>{todo.title}</Link>{" "}
      {/* 제목누르면 디테일 페이지로 이동, 파라미터로 뚜두 아이디 보내기*/}
      <p>{todo.contents}</p>
    </div>
  );
}

export default Auth(MainTodoPage, true);
