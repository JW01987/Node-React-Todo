const express = require("express");
const router = express.Router();
const { auth } = require("./../middleware/auth");
const { User } = require("./../models/User");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err) => {
    if (err) return res.json({ success: false, err });
    else return res.json({ success: true });
  });
});

router.post("/register/idcheck", (req, res) => {
  User.findOne({ id: req.body.id }, (err, userData) => {
    if (!userData) {
      return res.json({
        success: true,
        message: "해당 아이디 사용가능",
      });
    } else {
      return res.json({
        success: false,
        message: "해당 아이디 불가능",
      });
    }
  });
});

router.post("/login", (req, res) => {
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

router.get("/auth", auth, (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    image: req.user.image,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, message: "로그아웃 실패" });
    return res.json({ success: true, message: "로그아웃 성공" });
  });
});

module.exports = router;
