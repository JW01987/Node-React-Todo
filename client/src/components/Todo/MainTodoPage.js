import React, { useEffect, useState } from "react";
import axios from "axios";
import Auth from "../hoc/auth";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import styles from "./MainTodoPage.module.css";

function MainTodoPage({ userData }) {
  let [isloading, setIsLoading] = useState(true);
  let [todos, setTodos] = useState();
  let [search, setSearch] = useState("");
  let [searchData, setSearchData] = useState();
  let [count, setCount] = useState(0);
  useEffect(() => {
    if (userData) {
      axios
        .post("/api/todo/showtodos", { userId: userData._id })
        .then((res) => {
          setTodos(res.data.todoData);
          setIsLoading(false);
          setCount(res.data.todoData.length);
        });
    }
  }, [userData]);

  const onSearchChange = (e) => {
    setSearch(e.target.value); //유저 검색어 저장
  };
  useEffect(() => {
    onSearch();
  }, [search]);
  const onSearch = debounce(() => {
    axios
      .post(`/api/todo/search`, { search, userId: userData._id })
      .then((res) => {
        setSearchData(res.data.todoData);
      });
  }, 400);

  const date = new Date();
  const month = date.getMonth(); // 0부터 시작하므로 1을 더해주어야 합니다.
  const day = date.getDate();
  const weeks = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className={styles.mainDiv}>
      <div className={styles.row}>
        <div className={styles.col}>
          <h1>
            {month + 1}월 {day}일 {weeks[date.getDay()]}요일
          </h1>
          <p>오늘의 할 일 {count}개</p>
        </div>
        <Link to="/addtodo">+</Link>
      </div>
      <div style={{ marginTop: "1em", width: "100%", height: "70%" }}>
        <input
          placeholder="검색"
          onChange={onSearchChange}
          value={search}
          className={styles.search}
        />
        <div className={styles.todoDiv}>
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
        </div>
      </div>
    </div>
  );
}

function TodoList({ todo }) {
  return (
    <div key={todo._id} className={styles.todo}>
      <Link to={`/detail/${todo._id}`}>{todo.title}</Link>
      {/* 제목누르면 디테일 페이지로 이동, 파라미터로 뚜두 아이디 보내기*/}
    </div>
  );
}

export default Auth(MainTodoPage, true);
