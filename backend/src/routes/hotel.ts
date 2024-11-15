import express from 'express';
import { createHotel, updateHotel, deleteHotel, getOneHotel, getAllHotel, getHotelBySearch, getFeaturedHotel, getHotelCount } from '../controllers/hotelController';
import { verifyAdmin } from '../util/verifyToken';


const router = express.Router()

router.post('/', verifyAdmin, createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/:id', getOneHotel);

router.get('/', getAllHotel);

router.get('/search/getHotelBySearch', getHotelBySearch);
router.get('/search/getFeaturedHotel', getFeaturedHotel);
router.get('/search/getHotelCount', getHotelCount);



export default router;