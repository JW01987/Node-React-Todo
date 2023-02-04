import React, { useEffect, useState } from "react";
import axios from "axios";

function MainTodoPage() {
  useEffect(() => {
    axios
      .post("/api/todo/showtodos", { userId: "63db617d1c8b1de61abfdbbd" })
      .then((res) => setTodos(res.data.todoData));
  }, []);
  let [todos, setTodos] = useState([]);
  return (
    <div>
      <div>뚜두리스트 모임</div>
      {todos.map((todo) => {
        return <TodoList todo={todo} />;
      })}
    </div>
  );
}

function TodoList({ todo }) {
  return (
    <div key={todo._id}>
      <h4>{todo.title}</h4>
      <p>{todo.contents}</p>
    </div>
  );
}

export default MainTodoPage;
