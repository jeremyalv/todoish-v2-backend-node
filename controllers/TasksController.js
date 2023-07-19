import mongoose from "mongoose";

import Task from "../models/Task.js";

export const getAllTasks = async (req, res, next) => {
  // Get user data
  const { title, description, category, due_date } = req.body;
  
  // Validate user input (title, desc)
  if (!(title && description)) {
    res.status(400).send("Missing input fields, please try again.");
  }

  // Create new task
  const task = new Task();

  // Save task to db
  task.save();
};

export const getTaskById = async (req, res, next) => {
  
}

export const createTask = async (req, res, next) => {

};

export const updateTask = async (req, res, next) => {

}

export const deleteTask = async (req, res, next) => {
  
}