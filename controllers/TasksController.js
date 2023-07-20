import mongoose from "mongoose";

import Task from "../models/Task.js";

export const getAllTasks = async (req, res, next) => {
  // Query all tasks from db
  const tasks = await Task.find({});
  
  if (!tasks) {
    res.status(400).send("Bad request when getting all tasks.");
  }

  res.status(200).json({
    status: "success",
    message: "Tasks retrieved successfully.",
    tasks: tasks
  });
};

export const getTaskById = async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  
  if (!task) {
    res.status(404).send("Task not found.");
  }

  res.status(200).json({
    status: "success",
    message: "Task retrieved successfully.",
    task: task
  });
}

export const createTask = async (req, res, next) => {
  // Get user data
  const { title, description, category, due_date } = req.body;
  
  // Validate user input (title, desc)
  if (!(title && description)) {
    res.status(400).send("Missing input fields, please try again.");
  }

  // Create new task
  const task = new Task({
    title,
    description,
    category,
    due_date
  });

  // Save task to db
  await task.save();

  res.status(201).json({
    status: "success",
    message: "Task created successfully.",
    task: task
  });
};

export const updateTask = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, category, due_date } = req.body;

  if (!(title && description)) {
    res.status(400).send("Missing input fields, please try again.");
  }
  
  const task = await Task.findOne({ _id: id });

  if (!task) {
    res.status(404).send("Task not found.");
  }

  const newTask = await Task.findByIdAndUpdate(id, {
    title, 
    description,
    category,
    due_date  
  });

  res.status(200).json({
    status: "success",
    message: "Task updated successfully",
    prevTask: task
  });
}

export const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id });

  if (!task) {
    res.status(404).send("Task not found.");
  }
  
  await Task.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    message: "Task deleted successfully",
    task: task
  });
}