import React from "react";

function RegisterPage() {
  return (
    <div>
      <div>
        <h2>회원가입 페이지</h2>
        <form>
          <label for="id">아이디</label>
          <input placeholder="아이디를 입력하세요" type="text" id="id" />
          <label for="name">이름</label>
          <input placeholder="이름을 입력하세요" type="text" id="name" />
          <label for="passwords">비밀번호</label>
          <input
            placeholder="비밀번호를 입력하세요"
            type="password"
            id="password"
          />
          <label for="confirmPassword">비밀번호 확인</label>
          <input
            placeholder="비밀번호 확인"
            type="password"
            id="confirmPassword"
          />
          <button>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
