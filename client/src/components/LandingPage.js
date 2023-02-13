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
        <div className={styles.mainDiv}>
          <div>
            <div className={styles.titleDiv}>
              <h1 className={styles.title}>
                <span>{user.name || user.id}</span>님의
              </h1>
              <h1 className={styles.title}>하루를 기록하세요</h1>
              <p>오늘도 뚜두리스트를 완료해봅시다</p>
              <p>아기 상어 뚜루루뚜루</p>
              <p>베이베 샤크~ 뚜루뚜뚜두</p>
            </div>
            <div className={styles.btnDiv}>
              <NavLink to="/todo">뚜두구경</NavLink>
              <a onClick={onClickLogout}>가차업이 떠나기</a>
            </div>
          </div>
          <div className={styles.imgDiv}>
            <img className={styles.img} src="img/background1.png" />
          </div>
        </div>
      ) : (
        <div className={styles.mainDiv}>
          <div>
            <div className={styles.titleDiv}>
              <h1 className={styles.title}>오늘부터 당신의</h1>
              <h1 className={styles.title}>
                멋진 하루를 <span>기록</span>하세요
              </h1>
              <p>정말 간단한 회원가입으로 멋진 뚜두리스트와 함께</p>
              <p>당신의 하루를 믓찌게 으썸하게 기록해보세요</p>
              <p>기록하는 당신이 채고! 멋쪄!</p>
            </div>
            <div className={styles.btnDiv}>
              <NavLink to="/login">쪼인하라!</NavLink>
            </div>
          </div>
          <div className={styles.imgDiv}>
            <img className={styles.img} src="img/background.png" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth(LandingPage, null);
