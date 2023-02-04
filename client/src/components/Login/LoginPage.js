import React from "react";

function LoginPage() {
  return (
    <div>
      <div>
        <h2>로그인 페이지</h2>
        <form>
          <label>아이디</label>
          <input placeholder="아이디를 입력하세요" type="text" />
          <label>비밀번호</label>
          <input placeholder="비밀번호를 입력하세요" type="password" />
          <button>로그인</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
