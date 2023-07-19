import express from "express";
import { 
  register
 } from "../controllers/AuthController.js";

const AuthRouter = express.Router();


AuthRouter.post("/register", register);

AuthRouter.post("/login", (req, res) => {
  
});

export default AuthRouter;