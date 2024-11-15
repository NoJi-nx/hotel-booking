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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Hash password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hash = bcryptjs_1.default.hashSync(req.body.password, salt);
        const newUser = new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo
        });
        yield newUser.save();
        res.status(200).json({
            success: true,
            message: "Created a new user"
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create user. Try again."
        });
    }
});
exports.register = register;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // If user exists, then check password
        const checkRightPassword = yield bcryptjs_1.default.compareSync(req.body.password, user.password);
        if (!checkRightPassword) {
            return res.status(401).json({
                success: false,
                message: "Wrong email or password"
            });
        }
        const _a = user._doc, { password, role } = _a, rest = __rest(_a, ["password", "role"]);
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) // 15 days
        })
            .status(200)
            .json({
            token,
            data: Object.assign({}, rest),
            role,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
});
exports.login = login;
