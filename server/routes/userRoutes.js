// importing required modules
import express from "express";
import { registerUser, loginUser, getUserById, getUserResumes } from "../controllers/userController.js";

// importing authentication middleware
import protect from "../middlewares/authMiddleware.js";

// creating router instance
const userRouter = express.Router();

// creating endpoints which connects to controller functions
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, getUserById);
userRouter.get("/resumes", protect, getUserResumes);

// exporting the default user router
export default userRouter;