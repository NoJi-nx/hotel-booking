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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const hotel_1 = __importDefault(require("./routes/hotel"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const review_1 = __importDefault(require("./routes/review"));
const booking_1 = __importDefault(require("./routes/booking"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
};
//database connection
mongoose_1.default.set('strictQuery', false);
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error('MONGO_URI is not defined in environment variables');
}
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI);
        console.log('MongoDB database connected');
    }
    catch (err) {
        console.log("MongoDB database connection failed", err);
    }
});
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/hotels', hotel_1.default);
app.use('/api/v1/users', user_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/review', review_1.default);
app.use('/api/v1/booking', booking_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Booking API');
});
app.listen(port, () => {
    connect();
    console.log('Listening on port', port);
});
/* mongodb+srv://NJ12:<password>@cluster0.fppjh3j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */ 
