const mongoose = require("mongoose");
const { Schema } = mongoose;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String },
});

let Todo = mongoose.model("Todo", TodoSchema);
module.exports = { Todo };
