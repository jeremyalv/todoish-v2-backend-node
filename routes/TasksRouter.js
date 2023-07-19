import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/TasksController.js";

const TasksRouter = express.Router();

TasksRouter.get("/", getAllTasks);
TasksRouter.get("/:id", getTaskById);
TasksRouter.post("/", createTask);
TasksRouter.put("/:id", updateTask);
TasksRouter.delete("/:id", deleteTask);

export default TasksRouter;