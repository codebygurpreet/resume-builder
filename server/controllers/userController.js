import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIN: '7d'})
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