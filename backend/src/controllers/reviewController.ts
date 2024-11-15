import {Request, Response} from "express";
import Hotel from "../models/Hotel";
import Review from "../models/Review";


export const createReview = async(req: Request, res: Response) => {

    const hotelId = req.params.hotelId
    const newReview = new Review({...req.body})

    try{

        const savedReview = await newReview.save()

        await Hotel.findByIdAndUpdate(hotelId, {
            $push: { reviews: savedReview._id },
        });

        res
        .status(200)
        .json({
            success: true,
            message: "Review submitted",
            data: savedReview
        });

    } catch (err) {
        res
        .status(500)
        .json({
            success: false, 
            message: "failed to submit"
        })

    }
}