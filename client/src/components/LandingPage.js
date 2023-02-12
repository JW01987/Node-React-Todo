import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Auth from "./hoc/auth";
import styles from "./LandingPage.module.css";
function LandingPage() {
  let [user, setUser] = useState({});
  let [login, setlogin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/user/auth").then((res) => {
      if (res.data.isAuth) {
        setUser(res.data);
        setlogin(true);
      }
      return;
    });
  }, []);
  const onClickLogout = () => {
    axios.get("/api/user/logout").then((res) => {
      if (res.data.success) {
        alert(res.data.message);
        setlogin(false);
        window.location.replace("/");
      } else {
        alert("다시 시도해주세요");
      }
    });
  };
  return (
    <div className="main-div">
      {user.isAuth ? (
        <div>
          <h1 className={styles.title}>
            환영합니다 <span>{user.name || user.id}</span>님
          </h1>
          <div className={styles.btnDiv}>
            <button onClick={onClickLogout}>로그아웃하기</button>
            <NavLink to="/todo">뚜두구경</NavLink>
          </div>
        </div>
      ) : (
        <div>
          <h1 className={styles.title}>환영합니다</h1>
          <p>멋진 뚜두리스트와 함께 당신의 하루를 어쩌구 기록해보세요</p>
          <div className={styles.btnDiv}>
            <NavLink to="/login">로그인하기</NavLink>
            <NavLink to="/register">회원가입하기</NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth(LandingPage, null);
