import mongoose from "mongoose";

const TaskSchema = mongoose.Schema({
  authorId: String,

  title: String,
  description: String,
  category: String,

  is_finished: Boolean,
  due_date: Date,
  created_at: Date,
  updated_at: Date
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;