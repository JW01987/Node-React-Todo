import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../hoc/auth";
import styles from "./RegisterPage.module.css";
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
      setIdMsg("영어 대소문자,숫자 최소 4자리에서 최대 10자리입니다.");
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
      setNameMsg("영어 대소문자,한글,숫자 최대 10자리입니다.");
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
      setPwdMsg(
        "영어 대소문자,숫자,특수문자 조합으로 최소 6자리에서 20자리입니다."
      );
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
      <form onSubmit={onSubmitHandler}>
        <div className={styles.col}>
          <label htmlFor="id">아이디</label>
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
          <div>
            <span className={isId && isIdCheck ? styles.green : styles.red}>
              {idMsg}
            </span>
          </div>
        </div>
        <div className={styles.col}>
          <label htmlFor="name">이름</label>
          <input
            placeholder="이름을 입력하세요"
            type="text"
            id="name"
            onChange={onNameChangeHandler}
          />
          <span className={isName ? styles.green : styles.red}>{nameMsg}</span>
        </div>

        <div className={styles.col}>
          <label htmlFor="passwords">비밀번호</label>
          <span></span>
          <input
            placeholder="비밀번호를 입력하세요"
            type="password"
            id="password"
            onChange={onPWDChangeHandler}
          />
          <span className={isPwd ? styles.green : styles.red}>{pwdMsg}</span>
        </div>
        <div className={styles.col}>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            placeholder="비밀번호 확인"
            type="password"
            id="confirmPassword"
            onChange={onConfimPwdChangeHandler}
          />
          <span className={isConfirmPwd ? styles.green : styles.red}>
            {confirmPwdMsg}
          </span>
        </div>

        <button
          className={styles.submitBtn}
          disabled={!(isId && isName && isPwd && isConfirmPwd && isIdCheck)}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Auth(RegisterPage, false);
