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
    const user = await User.create({
      email: email.toLowerCase(), // Sanitize email to lowercase
      first_name,
      last_name,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      {
        user_id: user._id,
        email: email,
      },
      process.env.TOKEN_KEY,
      {
        algorithm: "HS256",
        expiresIn: "6h",
      }
    );

    // Save token to User object
    user.token = token;

    // TODO add user to database

    // Return new user
    res.status(201).json(user);
  }
  catch (err) {
    console.log(err);
  }
};
