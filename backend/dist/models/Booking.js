"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    userId: {
        type: String
    },
    userEmail: {
        type: String,
    },
    hotelName: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    guestSize: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    bookAt: {
        type: Date,
        required: true
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Booking", bookingSchema);
