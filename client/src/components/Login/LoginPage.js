import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Auth from "../hoc/auth";

function LoginPage() {
  let navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onIdChangeHandler = (e) => {
    setId(e.target.value);
  };
  const onPwdChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  let onSubmitHandler = async (e) => {
    e.preventDefault();
    let result = await axios
      .post("/api/user/login", { id, password })
      .then((res) => res.data);
    if (!result.success) return alert(result.message);
    navigate("/");
  };
  return (
    <div>
      <div>
        <h2>로그인 페이지</h2>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="id">아이디</label>
          <input
            placeholder="아이디를 입력하세요"
            type="text"
            id="id"
            onChange={onIdChangeHandler}
          />
          <label htmlFor="password">비밀번호</label>
          <input
            placeholder="비밀번호를 입력하세요"
            type="password"
            id="password"
            onChange={onPwdChangeHandler}
          />
          <button>로그인</button>
        </form>
      </div>
    </div>
  );
}

export default Auth(LoginPage, false);
