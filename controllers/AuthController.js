import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const register = async (req, res, next) => {
  try {
    // Get user input in request body
    const { email, first_name, last_name, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("Missing required fields");
    }

    // Check if user exists
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.status(409).send("User already exists. Please login instead.");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email: email.toLowerCase(), // Sanitize email to lowercase
      first_name,
      last_name,
      password: encryptedPassword,
    });

    // Save user to db
    await user.save();

    const token = createJWT(user);

    // Save token to User object
    user.token = token;

    // Return new user
    res.status(201).json({
      status: "success",
      message: "User created successfully.",
      user: user
    });
  }
  catch (err) {
    res.status(400).send(err.message);
  }
};

export const login = async (req, res, next) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("Missing required fields");
    }

    // Validate if user exists
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      return res.status(404).send("User not found. Please register instead.");
    }

    // Verify user password against stored password in DB
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Invalid password. Please try again");
    }

    // Refresh user JWT
    const token = createJWT(oldUser);
    oldUser.token = token;

    res.status(200).json({
      status: "success",
      message: "Login sucessful",
      user: oldUser
    });
  }
  catch (err) {
    res.status(400).send(err.message);
  }
}

const createJWT = (user) => {
  // Create token using record id and email
  const token = jwt.sign(
    {
      user_id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    }
  );

  return token;
}