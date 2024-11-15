import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import hotelRoute from './routes/hotel';
import userRoute from './routes/user';
import authRoute from './routes/auth';
import reviewRoute from './routes/review';
import bookingRoute from './routes/booking';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: "https://elaborate-empanada-3db14f.netlify.app",
    credentials: true
}

//database connection
mongoose.set('strictQuery', false)
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

const connect = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB database connected');
    } catch (err) {
        console.log("MongoDB database connection failed", err);
    }
}

//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/v1/hotels', hotelRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/booking', bookingRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the Hotel Booking API');
  });
  

app.listen(port, ()=>{
    connect();
    console.log('Listening on port', port)
})

