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
exports.getAllBooking = exports.getBooking = exports.createBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Request body:', req.body); // Add this line for debugging
        const newBooking = new Booking_1.default(req.body);
        const savedBooking = yield newBooking.save();
        res.status(201).json({
            success: true,
            message: 'Booking successful',
            data: savedBooking,
        });
    }
    catch (err) {
        console.error('Error creating booking:', err); // Add this line for debugging
        res.status(500).json({
            success: false,
            message: 'Booking failed. Please try again later.',
        });
    }
});
exports.createBooking = createBooking;
// Get one
const getBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield Booking_1.default.findById(id);
        res.status(200).json({
            success: true,
            message: "Found one",
            data: book,
        });
    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: "Not found"
        });
    }
});
exports.getBooking = getBooking;
// Get all
const getAllBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Booking_1.default.find();
        res.status(200).json({
            success: true,
            message: "Found all",
            data: books,
        });
    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: "server error"
        });
    }
});
exports.getAllBooking = getAllBooking;
