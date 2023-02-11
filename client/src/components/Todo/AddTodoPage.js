import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../hoc/auth";
function AddTodoPage({ userData }) {
  const navigate = useNavigate();
  const location = useLocation();
  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  let [isUpdate, setIsUpdate] = useState(false);
  let [todoId, setTodoId] = useState("");
  useEffect(() => {
    if (location.state !== null) {
      setTitle(location.state.todo.title);
      setContent(location.state.todo.content);
      setIsUpdate(true);
      setTodoId(location.state.todo._id);
    }
  }, []);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      return;
    }
    if (isUpdate) {
      try {
        const res = await axios.post("/api/todo/update", {
          _id: todoId,
          title,
          content,
        });
        navigate("/todo");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const res = await axios.post("/api/todo/add", {
          title,
          content,
          userId: userData._id,
        });
        navigate("/todo");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onTitleChange}
          value={title}
          placeholder="제목을 넣어주세요"
        />
        <input
          onChange={onContentChange}
          value={content}
          placeholder="내용을 넣어주세요"
        />
        <button>저장</button>
      </form>
    </div>
  );
}

export default Auth(AddTodoPage, true);
