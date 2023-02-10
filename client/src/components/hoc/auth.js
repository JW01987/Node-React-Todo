import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//로그인 한 유저 전용페이지 => true
//로그인 안 한 유저 전용페이지 => false
//아무나 들어 올 수 있는 페이지 =>null
const Auth = (ChildComponent, option) => {
  function AuthCheck(props) {
    const navigate = useNavigate();
    let [userData, setUserData] = useState();
    useEffect(() => {
      axios.get("/api/user/auth").then((res) => {
        setUserData(res.data);
        if (!res.data.isAuth) {
          //로그인하지 않음
          if (option) {
            //로그인 안 했는데 로그인 한 사람 전용 페이지에 들어가려할 때
            navigate("/login");
          }
        } else {
          //로그인 함
          if (option === false) {
            //로그인하고 로그인 안한사람용 페이지에 들어가려할때
            navigate("/");
          }
        }
      });
    }, []);
    return <ChildComponent {...props} userData={userData} />;
  }
  return AuthCheck;
};
export default Auth;
