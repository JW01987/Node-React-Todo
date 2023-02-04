require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const cookieParser = require("cookie-parser");
const apiUser = require("./routers/api.user");
const apiTodo = require("./routers/api.todo");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user", apiUser);
app.use("/api/todo", apiTodo);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, { dbName: "TODO" })
  .then(() => console.log("mongoose 연결"))
  .catch((e) => console.log(`연결실패 오류: ${e}`));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
