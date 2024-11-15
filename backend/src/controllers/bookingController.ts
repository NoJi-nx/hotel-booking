// bookingController.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking';

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log('Request body:', req.body); // Add this line for debugging

    const newBooking = new Booking(req.body);

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking successful',
      data: savedBooking,
    });
  } catch (err) {
    console.error('Error creating booking:', err); // Add this line for debugging
    res.status(500).json({
      success: false,
      message: 'Booking failed. Please try again later.',
    });
  }
};

// Get one
export const getBooking = async(req: Request, res: Response) => {
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res.status(200).json({
            success: true,
            message: "Found one",
            data: book,
        })


     
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "Not found"
        })
    }
}

// Get all

export const getAllBooking = async(req: Request, res: Response) => {
     

    try {
        const books = await Booking.find()

        res.status(200).json({
            success: true,
            message: "Found all",
            data: books,
        })


     
    } catch (err) {
        res.status(500).json({
            success: true,
            message: "server error"
        })
    }
}