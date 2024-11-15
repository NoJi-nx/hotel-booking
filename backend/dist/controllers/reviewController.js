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
exports.createReview = void 0;
const Hotel_1 = __importDefault(require("../models/Hotel"));
const Review_1 = __importDefault(require("../models/Review"));
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelId = req.params.hotelId;
    const newReview = new Review_1.default(Object.assign({}, req.body));
    try {
        const savedReview = yield newReview.save();
        yield Hotel_1.default.findByIdAndUpdate(hotelId, {
            $push: { reviews: savedReview._id },
        });
        res
            .status(200)
            .json({
            success: true,
            message: "Review submitted",
            data: savedReview
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            success: false,
            message: "failed to submit"
        });
    }
});
exports.createReview = createReview;
