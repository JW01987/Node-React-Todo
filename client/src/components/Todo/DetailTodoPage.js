import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import { useParams, useNavigate } from "react-router-dom";

function DetailTodo() {
  let navigate = useNavigate();
  const { todoId } = useParams();
  let [todo, setTodo] = useState();
  let [loading, setLoading] = useState(false);
  const getTodo = async () => {
    let result = await axios
      .get(`/api/todo/detail/${todoId}`)
      .then((res) => res.data.todoData);
    console.log(result);
    setTodo(result);
    setLoading(true);
  };
  useEffect(() => {
    getTodo();
  }, []);
  const deleteBtnClick = async () => {
    await axios.get(`/api/todo/delete/${todoId}`).then((res) => {
      console.log(res.data);
      navigate("/todo");
    });
  };
  return (
    <div>
      <div>
        {!loading ? (
          "로딩중"
        ) : (
          <>
            <h1>{todo.title}</h1>
            <p>{todo.content}</p>
            <ul>
              {todo.tags.map((tag) => (
                <li>{tag}</li>
              ))}
            </ul>
            <button onClick={() => navigate("/addtodo", { state: { todo } })}>
              수정
            </button>
            <button onClick={deleteBtnClick}>삭제</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Auth(DetailTodo, true);
