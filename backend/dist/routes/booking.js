"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const verifyToken_1 = require("../util/verifyToken");
const router = express_1.default.Router();
router.post('/', verifyToken_1.verifyUser, bookingController_1.createBooking);
router.get('/:id', verifyToken_1.verifyUser, bookingController_1.getBooking);
router.get('/', verifyToken_1.verifyAdmin, bookingController_1.getAllBooking);
exports.default = router;
