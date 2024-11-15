"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
const verifyToken_1 = require("../util/verifyToken");
router.put('/:id', verifyToken_1.verifyUser, userController_1.updateUser);
router.delete('/:id', verifyToken_1.verifyUser, userController_1.deleteUser);
router.get('/:id', verifyToken_1.verifyUser, userController_1.getOneUser);
router.get('/', verifyToken_1.verifyAdmin, userController_1.getAllUser);
exports.default = router;
