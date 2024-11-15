import express from 'express'
import { createReview } from '../controllers/reviewController'
import { verifyUser } from '../util/verifyToken'

const router = express.Router()

router.post('/:hotelId', verifyUser, createReview);

export default router