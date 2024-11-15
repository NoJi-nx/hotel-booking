"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelCount = exports.getHotelBySearch = exports.getFeaturedHotel = exports.getAllHotel = exports.getOneHotel = exports.deleteHotel = exports.updateHotel = exports.createHotel = void 0;
const Hotel_1 = __importDefault(require("../models/Hotel"));
//CRUD
//Create
const createHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newHotel = new Hotel_1.default(req.body);
    try {
        const savedHotel = yield newHotel.save();
        res
            .status(200)
            .json({
            success: true,
            message: 'Created new hotel.',
            data: savedHotel
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Failed to create a new hotel." });
    }
});
exports.createHotel = createHotel;
//Update
const updateHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Log the ID and body for debugging
        console.log("Updating hotel with ID:", id);
        console.log("Update data:", req.body);
        const updatedHotel = yield Hotel_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
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
    }
    catch (err) {
        console.error("Error updating a hotel:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
});
exports.updateHotel = updateHotel;
//Delete
const deleteHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield Hotel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Deleted a hotel",
        });
    }
    catch (err) {
        console.error("Error deleting a hotel:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
});
exports.deleteHotel = deleteHotel;
// Get one
const getOneHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const hotel = yield Hotel_1.default.findById(id).populate('reviews');
        res.status(200).json({
            success: true,
            message: "Found a hotel",
            data: hotel,
        });
    }
    catch (err) {
        console.error("Error finding a hotel:", err);
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
});
exports.getOneHotel = getOneHotel;
// Get all
const getAllHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const page = pageStr ? parseInt(pageStr, 10) : 1;
    const limit = limitStr ? parseInt(limitStr, 10) : 10;
    try {
        const skip = (page - 1) * limit;
        const hotels = yield Hotel_1.default.find({})
            .select('_id title city address price maxRoom desc reviews photo featured')
            .populate('reviews')
            .skip(skip)
            .limit(limit)
            .lean();
        const formattedHotels = hotels.map(hotel => (Object.assign(Object.assign({}, hotel), { id: hotel._id })));
        const totalHotels = yield Hotel_1.default.countDocuments({});
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
    }
    catch (err) {
        console.error("Error getting all hotels:", err);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve hotels",
        });
    }
});
exports.getAllHotel = getAllHotel;
// featured hotels
const getFeaturedHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 8;
    try {
        const hotels = yield Hotel_1.default.find({ featured: true })
            .select('_id title city address price maxRoom desc reviews photo featured')
            .populate('reviews')
            .limit(limit)
            .lean();
        // Map _id to id
        const formattedHotels = hotels.map(hotel => (Object.assign(Object.assign({}, hotel), { id: hotel._id })));
        res.status(200).json({
            success: true,
            message: "Successful",
            data: formattedHotels,
        });
    }
    catch (err) {
        console.error("Error getting featured hotels:", err);
        res.status(404).json({
            success: false,
            message: "Not found all of them",
        });
    }
});
exports.getFeaturedHotel = getFeaturedHotel;
const getHotelBySearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const titleStr = req.query.title;
    const cityStr = req.query.city;
    const maxRoomStr = req.query.maxRoom;
    const title = titleStr ? new RegExp(titleStr, 'i') : undefined;
    const maxRoom = maxRoomStr ? parseInt(maxRoomStr) : undefined;
    try {
        const query = {};
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
        const hotels = yield Hotel_1.default.find(query).populate('reviews').lean();
        // Map _id to id
        const formattedHotels = hotels.map(hotel => (Object.assign(Object.assign({}, hotel), { id: hotel._id })));
        console.log("Query Result: ", formattedHotels); // Debugging line
        res.status(200).json({
            success: true,
            message: "Successful",
            data: formattedHotels,
        });
    }
    catch (err) {
        console.error("Error finding hotels:", err);
        res.status(404).json({
            success: false,
            message: "Not found"
        });
    }
});
exports.getHotelBySearch = getHotelBySearch;
const getHotelCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotelCount = yield Hotel_1.default.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            data: hotelCount
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to count"
        });
    }
});
exports.getHotelCount = getHotelCount;
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
