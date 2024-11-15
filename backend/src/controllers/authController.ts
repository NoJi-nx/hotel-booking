import { Request, Response } from 'express';
import { Document } from 'mongoose';
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// define an interface for User model to help with TypeScript
interface UserDoc extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  photo?: string;
  _doc: any; //access the internal MongoDB document data
}

// Register
export const register = async (req: Request, res: Response) => {
    try {
        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Created a new user"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create user. Try again."
        });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email }) as UserDoc;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // If user exists, then check password
        const checkRightPassword = await bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!checkRightPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong email or password"
            });
        }

        const { password, role, ...rest } = user._doc;

        // Create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "15d" }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
        })
        .status(200)
        .json({
           token,
            data: { ...rest },
            role,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};