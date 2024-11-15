"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = require("../controllers/hotelController");
const verifyToken_1 = require("../util/verifyToken");
const router = express_1.default.Router();
router.post('/', verifyToken_1.verifyAdmin, hotelController_1.createHotel);
router.put('/:id', hotelController_1.updateHotel);
router.delete('/:id', verifyToken_1.verifyAdmin, hotelController_1.deleteHotel);
router.get('/:id', hotelController_1.getOneHotel);
router.get('/', hotelController_1.getAllHotel);
router.get('/search/getHotelBySearch', hotelController_1.getHotelBySearch);
router.get('/search/getFeaturedHotel', hotelController_1.getFeaturedHotel);
router.get('/search/getHotelCount', hotelController_1.getHotelCount);
exports.default = router;
