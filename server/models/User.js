require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const saltRounds = 11;
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const UserSchema = new Schema({
  name: { type: String },
  id: { type: String, unique: 1 },
  password: { type: String },
  token: { type: String },
  image: { type: String },
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = function (userPassword, next) {
  bcrypt.compare(userPassword, this.password, function (err, result) {
    if (err) return next(err);
    next(null, result);
  });
};

UserSchema.methods.addToken = function (next) {
  var user = this;
  const token = jwt.sign(user._id.toHexString(), jwtSecret);
  user.token = token;
  user.save((err, data) => {
    if (err) return next(err);
    next(null, data);
  });
};

UserSchema.statics.findToken = function (token, next) {
  var user = this;
  jwt.verify(token, jwtSecret, (err, decoded) => {
    user.findOne({ _id: decoded, token: token }, (err, data) => {
      if (err) return next(err);
      return next(null, data);
    });
  });
};

let User = mongoose.model("User", UserSchema);
module.exports = { User };
