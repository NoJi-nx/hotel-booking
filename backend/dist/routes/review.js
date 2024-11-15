"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const verifyToken_1 = require("../util/verifyToken");
const router = express_1.default.Router();
router.post('/:hotelId', verifyToken_1.verifyUser, reviewController_1.createReview);
exports.default = router;
