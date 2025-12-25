// imoprt necessary modules
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// creating express app and PORT variable
const app = express();
const PORT = process.env.PORT || 3000;

// using express json middleware and cors middleware
app.use(express.json());
app.use(cors());

app.get('/', (req,res)=> {
    res.send("Server is live...")
})

// app listening on
app.listen((PORT), async ()=>{
    // Database connection
    await connectDB();
    console.log(`Server is running on port ${PORT}`)   
})