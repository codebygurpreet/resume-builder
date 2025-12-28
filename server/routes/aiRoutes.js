// importing required modules
import express from "express";
import { enhanceProfessionalSummary, enhanceJobDescription, uploadResume } from "../controllers/aiController.js"

// importing middleware
import protect from "../middlewares/authMiddleware.js";

// creating router instance
const aiRouter = express.Router();

// creating endpoints which connects to controller functions
aiRouter.post('/enhance-pro-sum', protect, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, uploadResume);

// exporting the default user router
export default aiRouter;