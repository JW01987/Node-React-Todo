import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Auth from "../hoc/auth";
import styles from "./LoginPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faTwitter,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
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
    <div className={styles.mainDiv}>
      <h2 className={styles.loginTitle}>로그인 페이지</h2>

      <form onSubmit={onSubmitHandler} className={styles.loginForm}>
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

      <div>
        <h4 style={{ textAlign: "center", color: "#455a64" }}>완탓찌로그인</h4>
        <div className={styles.snsLogin}>
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faGoogle} />
          <FontAwesomeIcon icon={faApple} />
        </div>
      </div>
      <div>
        <NavLink to="/register" className={styles.link}>
          아직 회원가입을 안 했다구..?
        </NavLink>
      </div>
    </div>
  );
}

export default Auth(LoginPage, false);
