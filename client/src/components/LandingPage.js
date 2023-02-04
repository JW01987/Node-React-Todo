import React from "react";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div>
        <h1>랜딩페이지</h1>
        <NavLink to="/login">로그인하러가기</NavLink>
        <NavLink to="/register">회원가입하기</NavLink>
        <NavLink to="/todo">뚜두구경</NavLink>
      </div>
    </div>
  );
}

export default LandingPage;
