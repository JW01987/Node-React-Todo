import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./DetailTodoPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
      navigate("/todo");
    });
  };
  return (
    <div className={styles.mainDiv}>
      <div style={{ width: "100%" }}>
        {!loading ? (
          "로딩중"
        ) : (
          <div>
            <div
              style={{
                marginBottom: "2em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h1 className={styles.title}>{todo.title}</h1>{" "}
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => navigate("/todo")}
                className={styles.cancelBtn}
              />
            </div>
            <div className={styles.content}>
              <p>{todo.content}</p>
            </div>
            <button
              onClick={() => navigate("/addtodo", { state: { todo } })}
              className={styles.updateBtn}
            >
              수정
            </button>
            <button onClick={deleteBtnClick} className={styles.deleteBtn}>
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth(DetailTodo, true);
