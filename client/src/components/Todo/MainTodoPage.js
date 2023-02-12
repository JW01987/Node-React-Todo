import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

function MainTodoPage({ userData }) {
  let [isloading, setIsLoading] = useState(true);
  let [todos, setTodos] = useState();
  let [search, setSearch] = useState("");
  let [searchData, setSearchData] = useState();
  useEffect(() => {
    if (userData) {
      axios
        .post("/api/todo/showtodos", { userId: userData._id })
        .then((res) => {
          setTodos(res.data.todoData);
          setIsLoading(false);
        });
    }
  }, [userData]);

  const onSearchChange = (e) => {
    setSearch(e.target.value); //유저 검색어 저장
  };
  useEffect(() => {
    onSearch(); //서버로 보내기
  }, [search]);
  const onSearch = debounce((e) => {
    console.log("검색어:", search);
    axios.get(`/api/todo/search/${search}`).then((res) => {
      setSearchData(res.data.todoData);
      console.log(searchData);
    });
  }, 400);
  return (
    <div>
      <input placeholder="검색" onChange={onSearchChange} value={search} />
      <h1>뚜두리스트 모임</h1>
      {isloading ? (
        <p>로딩중</p>
      ) : search.length === 0 ? (
        todos.map((todo) => {
          return <TodoList todo={todo} />;
        })
      ) : !searchData ? (
        <p>검색결과가 없습니다</p>
      ) : (
        searchData.map((todo) => {
          return <TodoList todo={todo} />;
        })
      )}
      <Link to="/addtodo">뚜두추가</Link>
    </div>
  );
}

function TodoList({ todo }) {
  return (
    <div key={todo._id}>
      <Link to={`/detail/${todo._id}`}>{todo.title}</Link>{" "}
      {/* 제목누르면 디테일 페이지로 이동, 파라미터로 뚜두 아이디 보내기*/}
      <p>{todo.contents}</p>
    </div>
  );
}

export default Auth(MainTodoPage, true);
