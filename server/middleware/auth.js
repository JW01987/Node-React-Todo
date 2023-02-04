const { User } = require("./../models/User");

let auth = (req, res, next) => {
  const token = req.cookies.choco_cookie;
  //복호화와 유저찾기
  User.findToken(token, (err, userData) => {
    if (err) throw err;
    if (!userData)
      return res.json({ isAuth: false, message: "로그인이 필요합니다" });

    req.token = token;
    req.user = userData;

    next();
  });
};

module.exports = { auth };
