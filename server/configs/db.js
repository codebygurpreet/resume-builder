// importing mongoose module
import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
    try{
        mongoose.connection.on("connected", ()=>{console.log("Databaseconnected successfully")})

        let mongodbURI = process.env.mongodbURI;
        const projectName = 'resume-builder';

        if(!mongodbURI){
            throw new Error("MONGODB_URI environment variable not set");
        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)
    }catch(error) {
        console.error("Error connecting to MongoDB:", error)
    }
}