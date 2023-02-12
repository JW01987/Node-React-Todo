const express = require("express");
const router = express.Router();
const { Todo } = require("./../models/Todo");

router.post("/add", (req, res) => {
  const todo = new Todo(req.body);
  todo.save((err) => {
    if (err) return res.json({ success: false, err });
    else return res.json({ success: true });
  });
});

router.get("/detail/:todoId", (req, res) => {
  Todo.findOne({ _id: req.params.todoId }, (err, todoData) => {
    if (!todoData) {
      return res.json({
        success: false,
        message: "해당 할 일이 없습니다",
      });
    }
    if (todoData) {
      return res.json({ success: true, todoData });
    }
  });
});

router.post("/showtodos", (req, res) => {
  //get으로 바꿔도 될것같음
  Todo.find({ userId: req.body.userId }, (err, todoData) => {
    if (!todoData) {
      return res.json({
        success: false,
        message: "해당 할 일이 없습니다",
      });
    }
    if (todoData) {
      return res.json({ success: true, todoData });
    }
  });
});

router.post("/update", (req, res) => {
  console.log(req.body);
  Todo.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { title: req.body.title, content: req.body.content } },
    { returnNewDocument: true },
    (err, user) => {
      if (err) return res.json({ success: false, message: "수정 실패" });
      return res.json({ success: true, message: "수정 성공" });
    }
  );
});

router.get("/search/:searchWord", (req, res) => {
  let searchWord = req.params.searchWord;
  let options = [
    { title: new RegExp(searchWord) },
    { content: new RegExp(searchWord) },
  ];
  Todo.find({ $or: options }, (err, todoData) => {
    if (err) return res.json({ success: false, message: "검색 실패" });
    if (todoData.length === 0) {
      return res.json({
        success: true,
        message: "검색 결과가 없습니다",
        todoData: false,
      });
    }
    return res.json({ success: true, message: "검색 성공", todoData });
  });
});

router.get("/delete/:todoId", (req, res) => {
  Todo.findOneAndDelete({ _id: req.params.todoId }, (err) => {
    if (err) return res.json({ success: false, message: "삭제 실패" });
    return res.json({ success: true, message: "삭제 성공" });
  });
});

module.exports = router;
