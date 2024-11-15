import express from 'express'
import { createBooking, getAllBooking, getBooking } from "../controllers/bookingController"
import { verifyAdmin, verifyUser } from '../util/verifyToken'

const router = express.Router()

router.post('/', verifyUser, createBooking );
router.get('/:id', verifyUser, getBooking );
router.get('/', verifyAdmin, getAllBooking );

export default router