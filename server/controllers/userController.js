import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Resume from '../models/Resume.js';

const generateToken = (userId)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
}

// controller for user registration
// POST: /api/users/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if required field are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // check if user already exists
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "User already exists" });
        }

        // hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({name,email,password: hashedPassword})

        // generate token and remove password from response
        const token = generateToken(newUser._id);
        newUser.password = undefined;

        // success response
        return res.status(201).json({ message: "User created successfuly", token, user: newUser });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for user login
// POST: /api/users/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user already exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // check if password is correct
        if(!user.comparePassword(password)){
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // generate token and remove password from response
        const token = generateToken(user._id);
        user.password = undefined;

        // success response
        return res.status(200).json({ message: "Login successfully", token, user: user });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// controller for getting user by id
// POST: /api/users/data
export const getUserById = async (req, res) => {
    try {
        // we will get userID through protect middleware
        const userId = req.userId;

        // check if user already exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        // remove password from response and success response
        user.password = undefined;
        return res.status(200).json({ user });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}


// controller for getting user resumes
// POST: /api/users/resumes
export const getUserResumes = async (req, res) => {
    try {
        // we will get userID through protect middleware
        const userId = req.userId;

        // return user resumes 
        const resumes = await Resume.find({userId});
        return res.status(200).json({ resumes });

    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
