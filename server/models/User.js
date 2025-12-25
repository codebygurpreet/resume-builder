// Import mongoose to work with MongoDB
import mongoose, { Schema } from "mongoose";

// Import bcrypt to compare hashed passwords
import bcrypt from "bcrypt";

// Create a User Schema (blueprint for User data)
const UserSchema = new Schema({
    // User's name
    name: {
        type: String,
        required: true
    },

    // User's email
    email: {
        type: String,
        required: true,
        unique: true
    },

    // User's password
    password: {
        type: String,
        required: true
    }

}, { 
    // automatically adds createdAt & updatedAt for every User
    timestamps: true      
});

// Custom method to check password during login
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Create User model using the schema
const User = mongoose.model("User", UserSchema);

// Export User model to use in other files
export default User;
