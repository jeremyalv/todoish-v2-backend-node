import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/TasksController.js";
import auth from "../middleware/auth.js";

const TasksRouter = express.Router();

TasksRouter.get("/", auth, getAllTasks);
TasksRouter.get("/:id", auth, getTaskById);
TasksRouter.post("/", auth, createTask);
TasksRouter.put("/:id", auth, updateTask);
TasksRouter.delete("/:id", auth, deleteTask);

export default TasksRouter;