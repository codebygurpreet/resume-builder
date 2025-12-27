// importing required modules
import express from "express";
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume} from "../controllers/resumeController.js"

// importing middleware
import protect from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js"


// creating router instance
const resumeRouter = express.Router();

// creating endpoints which connects to controller functions
resumeRouter.post("/create", protect, createResume);
resumeRouter.put("/update", upload.single('image'), protect, updateResume);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", protect, getPublicResumeById);

// exporting the default user router
export default resumeRouter;