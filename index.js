require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./models/User");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, { dbName: "TODO" })
  .then(() => console.log("mongoose 연결"))
  .catch((e) => console.log(`연결실패 오류: ${e}`));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.json({ success: false, err });
    else return res.json({ success: true });
  });
});

app.post("/api/user/login", (req, res) => {
  User.findOne({ id: req.body.id }, (err, userData) => {
    if (!userData) {
      return res.json({
        success: false,
        message: "해당 아이디가 존재하지않습니다",
      });
    }
    userData.checkPassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          success: false,
          message: "비밀번호가 일치하지 않습니다",
        });
      userData.addToken((err, user) => {
        if (err) return res.send(err);
        res.cookie("choco_cookie", user.token).json({ success: true });
      });
    });
  });
});

app.post("/api/user/auth", auth, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    image: req.user.image,
  });
});

app.get("/api/user/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, message: "로그아웃 실패" });
    return res.json({ success: true, message: "로그아웃 성공" });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
