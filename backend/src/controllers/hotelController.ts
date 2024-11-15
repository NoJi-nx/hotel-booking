import { Request, Response } from 'express';
import Hotel from "../models/Hotel";


//CRUD
//Create
export const createHotel = async(req: Request, res: Response)=>{
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()

        res
        .status(200)
        .json({
            success:true,
            message:'Created new hotel.', 
            data:savedHotel
        })
    } catch (err) {
        res
        .status(500)
        .json({success: false, message: "Failed to create a new hotel."})
    }
};

//Update
export const updateHotel = async(req: Request, res: Response) => {
    const id = req.params.id;

    try {
        // Log the ID and body for debugging
        console.log("Updating hotel with ID:", id);
        console.log("Update data:", req.body);

        const updatedHotel = await Hotel.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true }
        );

        // check if the update operation actually found a document
        if (!updatedHotel) {
            return res.status(404).json({
                success: false,
                message: "Hotel not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Updated a hotel",
            data: updatedHotel,
        });
    } catch (err) {
        console.error("Error updating a hotel:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update",  
        });
    }
};

//Delete
export const deleteHotel = async(req: Request, res: Response)=>{
    const id = req.params.id;

    try {
        await Hotel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Deleted a hotel",
         
        });
    } catch (err) {
        console.error("Error deleting a hotel:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete",  
        });
    }
};

// Get one
 

export const  getOneHotel = async(req: Request, res: Response)=>{
        const id = req.params.id;
    
        try {
           const hotel = await Hotel.findById(id).populate('reviews');
    
            res.status(200).json({
                success: true,
                message: "Found a hotel",
                data: hotel,
             
            });
        } catch (err) {
            console.error("Error finding a hotel:", err);
            res.status(404).json({
                success: false,
                message: "Not found",  
            });
        }
    };


// Get all
export const getAllHotel = async (req: Request, res: Response) => {
    const pageStr = req.query.page as string | undefined;
    const limitStr = req.query.limit as string | undefined;
    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const limit = limitStr ? parseInt(limitStr, 10) : 10;
  
    try {
      const skip = (page - 1) * limit;
      const hotels = await Hotel.find({})
  .select('_id title city address price maxRoom desc reviews photo featured')
  .populate('reviews')
  .skip(skip)
  .limit(limit)
  .lean();

const formattedHotels = hotels.map(hotel => ({
  ...hotel,
  id: hotel._id,  // Map _id to id
}));

  
      const totalHotels = await Hotel.countDocuments({});
      const totalPages = Math.ceil(totalHotels / limit);
  
      res.status(200).json({
        success: true,
        count: hotels.length,
        message: "Successful",
        data: formattedHotels,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalHotels,
        },
      });
    } catch (err) {
      console.error("Error getting all hotels:", err);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve hotels",
      });
    }
  };
  

// featured hotels
export const getFeaturedHotel = async (req: Request, res: Response) => {
    const limit = 8; 
  
    try {
      const hotels = await Hotel.find({ featured: true })
        .select('_id title city address price maxRoom desc reviews photo featured')
        .populate('reviews')
        .limit(limit)
        .lean();
  
      // Map _id to id
      const formattedHotels = hotels.map(hotel => ({
        ...hotel,
        id: hotel._id,
      }));
  
      res.status(200).json({
        success: true,
        message: "Successful",
        data: formattedHotels,
      });
    } catch (err) {
      console.error("Error getting featured hotels:", err);
      res.status(404).json({
        success: false,
        message: "Not found all of them",
      });
    }
  };

  export const getHotelBySearch = async (req: Request, res: Response) => {
    const titleStr = req.query.title as string | undefined;
    const cityStr = req.query.city as string | undefined;
    const maxRoomStr = req.query.maxRoom as string | undefined;

    const title = titleStr ? new RegExp(titleStr, 'i') : undefined;
    const maxRoom = maxRoomStr ? parseInt(maxRoomStr) : undefined;

    try {
        const query: any = {};

        if (title) {
            query.title = { $regex: title }; // Use $regex for partial match
        }
        if (cityStr) {
            query.city = new RegExp(`^${cityStr}$`, 'i'); // Case-insensitive match
        }
        if (maxRoom !== undefined) {
            query.maxRoom = { $gte: maxRoom };
        }

        console.log("Constructed Query: ", query); // Debugging line

        const hotels = await Hotel.find(query).populate('reviews').lean();

        // Map _id to id
        const formattedHotels = hotels.map(hotel => ({
            ...hotel,
            id: hotel._id, // Map _id to id
        }));

        console.log("Query Result: ", formattedHotels); // Debugging line

        res.status(200).json({
            success: true,
            message: "Successful",
            data: formattedHotels,
        });
    } catch (err) {
        console.error("Error finding hotels:", err);
        res.status(404).json({
            success: false,
            message: "Not found"
        });
    }
};

export const getHotelCount = async (req: Request, res: Response) => {
    try {
        const hotelCount = await Hotel.estimatedDocumentCount();

        res.status(200).json({
            success: true,
            data: hotelCount
        });
    } catch (err) {
        res.status(500).json({
            success: false, 
            message: "Failed to count"
        });
    }
};

/* export const getAllHotel = async (req: Request, res: Response) => {
    const pageStr = req.query.page as string | undefined;
    const limit = 2; 

    try {
        let hotels;
        if (pageStr) {
            const page = parseInt(pageStr, 10);
            const skip = (page - 1) * limit;

            hotels = await Hotel.find({})
                .populate('reviews')
                .skip(skip)
                .limit(limit);

            const totalHotels = await Hotel.countDocuments({});
            const totalPages = Math.ceil(totalHotels / limit);

            return res.status(200).json({
                success: true,
                count: hotels.length,
                message: "Successful",
                data: hotels,
                pagination: {
                    currentPage: page,
                    totalPages: totalPages,
                    totalItems: totalHotels
                }
            });
        } else {
            // no pagination is requested, return all hotels
            hotels = await Hotel.find({}).populate('reviews');
            return res.status(200).json({
                success: true,
                count: hotels.length,
                message: "Successful",
                data: hotels
            });
        }
    } catch (err) {
        console.error("Error getting all hotels:", err);
        res.status(404).json({
            success: false,
            message: "Not found all of them"
        });
    }
}; */