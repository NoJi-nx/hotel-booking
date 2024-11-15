import { Request, Response } from 'express';
import User from "../models/User";


//CRUD
//Create
export const createUser = async(req: Request, res: Response)=>{
    const newUser = new User(req.body)

    try {
        const savedUser = await newUser.save()

        res
        .status(200)
        .json({
            success:true,
            message:'Created new User.', 
            data:savedUser
        })
    } catch (err) {
        res
        .status(500)
        .json({success: false, message: "Failed to create a new User."})
    }
};

//Update
export const updateUser = async(req: Request, res: Response) => {
    const id = req.params.id;

    try {
        // Log the ID and body for debugging
        console.log("Updating User with ID:", id);
        console.log("Update data:", req.body);

        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true }
        );

        // check if the update operation actually found a document
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Updated a User",
            data: updatedUser,
        });
    } catch (err) {
        console.error("Error updating a User:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update",  
        });
    }
};

//Delete
export const deleteUser = async(req: Request, res: Response)=>{
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Deleted a User",
         
        });
    } catch (err) {
        console.error("Error deleting a User:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete",  
        });
    }
};

// Get one
 

export const  getOneUser = async(req: Request, res: Response)=>{
        const id = req.params.id;
    
        try {
           const user = await User.findById(id);
    
            res.status(200).json({
                success: true,
                message: "Found an user",
                data: user,
             
            });
        } catch (err) {
            console.error("Error finding a User:", err);
            res.status(404).json({
                success: false,
                message: "Not found",  
            });
        }
    };


// Get all
export const getAllUser = async (req: Request, res: Response) => {
    
     

    try {
        const users = await User.find({})

        res.status(200).json({
            success:  true,
             message:"Successful",
             data: users,

        });
    } catch (err) {
        console.error("Error getting all Users:", err);
        res.status(404).json({
            success: false,
            message: "Not found all of them"
        });
    }
};



 

