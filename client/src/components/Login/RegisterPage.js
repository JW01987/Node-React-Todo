import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../hoc/auth";
import styles from "./RegisterPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faTwitter,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
function RegisterPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  //로그인 메세지 저장
  const [idMsg, setIdMsg] = useState("");
  const [nameMsg, setNameMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");

  //정규식 체크 후 상태
  const [isId, setIsId] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  const [isConfirmPwd, setIsConfirmPwd] = useState(false);
  const [isIdCheck, setIsIdCheck] = useState(false);

  const onIdChangeHandler = (e) => {
    setIsIdCheck(false);
    setIsId(false);
    const currentId = e.target.value;
    const idRegex = new RegExp(/^([a-zA-Z0-9]){4,9}$/);
    setId(currentId);
    if (!idRegex.test(currentId)) {
      setIdMsg("문자,숫자 포함 4-10자리");
      setIsId(false);
    } else {
      setIdMsg("중복검사를 해야합니다");
      setIsId(true);
    }
  };
  const onNameChangeHandler = (e) => {
    const currentName = e.target.value;
    const nameRegex = new RegExp(/^[a-zA-Z0-9가-힣]{1,9}$/);
    setName(currentName);
    if (!nameRegex.test(currentName)) {
      setNameMsg("문자,숫자포함 최대 10자리");
      setIsName(false);
    } else {
      setNameMsg("올바른 아이디입니다");
      setIsName(true);
    }
  };
  const onPWDChangeHandler = (e) => {
    const currentPwd = e.target.value;
    const pwdRegex = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,19}$/
    );
    setPassword(currentPwd);
    if (!pwdRegex.test(currentPwd)) {
      setPwdMsg("문자,숫자,특수문자 포함 6-20자리");
      setIsPwd(false);
    } else {
      setPwdMsg("올바른 비밀번호입니다");
      setIsPwd(true);
    }
  };
  const onConfimPwdChangeHandler = (e) => {
    const currentConfimPwd = e.target.value;
    setConfirmPwd(currentConfimPwd);
    if (!(currentConfimPwd === password)) {
      setConfirmPwdMsg("비밀번호를 확인해주십시오");
      setIsConfirmPwd(false);
    } else {
      setConfirmPwdMsg("비밀번호 확인");
      setIsConfirmPwd(true);
    }
  };

  const idCheckHeandler = async (e) => {
    e.preventDefault();
    let result = await axios
      .post("/api/user/register/idcheck", { id })
      .then((res) => res.data);
    if (!result.success) {
      setIsIdCheck(false);
      setIdMsg(result.message);
    } else {
      setIsIdCheck(true);
      setIdMsg(result.message);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let result = await axios
      .post("/api/user/register", { id, name, password })
      .then((res) => res.data);
    if (!result.success) return alert("오류가 발생했습니다");
    alert("가입이 완료되었습니다");
    navigate("/");
  };
  return (
    <div className={styles.mainDiv}>
      <h2 className={styles.title}>회원가입 페이지</h2>
      <form onSubmit={onSubmitHandler} className={styles.registerForm}>
        <div className={styles.col}>
          <label htmlFor="id">
            아이디{" "}
            <span className={isId && isIdCheck ? styles.green : styles.red}>
              {idMsg}
            </span>
          </label>
          <div className={styles.row}>
            <input
              className={styles.idInput}
              placeholder="아이디를 입력하세요"
              type="text"
              id="id"
              onChange={onIdChangeHandler}
            />
            <button
              onClick={idCheckHeandler}
              disabled={!isId}
              className={styles.idBtn}
            >
              중복검사
            </button>
          </div>
          <div></div>
        </div>
        <div className={styles.col}>
          <label htmlFor="name">
            이름{" "}
            <span className={isName ? styles.green : styles.red}>
              {nameMsg}
            </span>
          </label>
          <input
            placeholder="이름을 입력하세요"
            type="text"
            id="name"
            onChange={onNameChangeHandler}
          />
        </div>

        <div className={styles.col}>
          <label htmlFor="passwords">
            비밀번호{" "}
            <span className={isPwd ? styles.green : styles.red}>{pwdMsg}</span>
          </label>
          <span></span>
          <input
            placeholder="비밀번호 입력"
            type="password"
            id="password"
            onChange={onPWDChangeHandler}
          />
        </div>
        <div className={styles.col}>
          <label htmlFor="confirmPassword">
            비밀번호 확인{" "}
            <span className={isConfirmPwd ? styles.green : styles.red}>
              {confirmPwdMsg}
            </span>
          </label>
          <input
            placeholder="비밀번호 확인"
            type="password"
            id="confirmPassword"
            onChange={onConfimPwdChangeHandler}
          />
        </div>

        <button
          className={styles.submitBtn}
          disabled={!(isId && isName && isPwd && isConfirmPwd && isIdCheck)}
        >
          회원가입
        </button>
      </form>

      <div>
        <h4 style={{ textAlign: "center", color: "#455a64", marginTop: "2em" }}>
          완탓찌 회원가입
        </h4>
        <div className={styles.snsLogin}>
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faGoogle} />
          <FontAwesomeIcon icon={faApple} />
        </div>
      </div>
    </div>
  );
}

export default Auth(RegisterPage, false);
