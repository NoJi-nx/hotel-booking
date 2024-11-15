"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = exports.verifyUser = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token received:", token); // Debug log
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "You're not authorized",
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log("Token verification error:", err); // Debug log
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        console.log("Token verified successfully, user:", user); // Debug log
        req.user = user;
        next();
    });
};
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => {
    (0, exports.verifyToken)(req, res, () => {
        var _a;
        const userIdFromToken = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userIdFromRequest = req.body.userId || req.params.id;
        console.log("User ID from token:", userIdFromToken);
        console.log("User ID from request:", userIdFromRequest);
        if (userIdFromToken === userIdFromRequest || req.user.role === 'admin') {
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "You're not authenticated",
            });
        }
    });
};
exports.verifyUser = verifyUser;
const verifyAdmin = (req, res, next) => {
    (0, exports.verifyToken)(req, res, (err) => {
        if (err) {
            return next(err);
        }
        if (req.user.role === 'admin') {
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "You're not authorized"
            });
        }
    });
};
exports.verifyAdmin = verifyAdmin;
