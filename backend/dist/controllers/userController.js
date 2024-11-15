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
exports.getAllUser = exports.getOneUser = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
//CRUD
//Create
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new User_1.default(req.body);
    try {
        const savedUser = yield newUser.save();
        res
            .status(200)
            .json({
            success: true,
            message: 'Created new User.',
            data: savedUser
        });
    }
    catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Failed to create a new User." });
    }
});
exports.createUser = createUser;
//Update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        // Log the ID and body for debugging
        console.log("Updating User with ID:", id);
        console.log("Update data:", req.body);
        const updatedUser = yield User_1.default.findByIdAndUpdate(id, { $set: req.body }, { new: true });
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
    }
    catch (err) {
        console.error("Error updating a User:", err);
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
});
exports.updateUser = updateUser;
//Delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield User_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Deleted a User",
        });
    }
    catch (err) {
        console.error("Error deleting a User:", err);
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
});
exports.deleteUser = deleteUser;
// Get one
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User_1.default.findById(id);
        res.status(200).json({
            success: true,
            message: "Found an user",
            data: user,
        });
    }
    catch (err) {
        console.error("Error finding a User:", err);
        res.status(404).json({
            success: false,
            message: "Not found",
        });
    }
});
exports.getOneUser = getOneUser;
// Get all
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({});
        res.status(200).json({
            success: true,
            message: "Successful",
            data: users,
        });
    }
    catch (err) {
        console.error("Error getting all Users:", err);
        res.status(404).json({
            success: false,
            message: "Not found all of them"
        });
    }
});
exports.getAllUser = getAllUser;
