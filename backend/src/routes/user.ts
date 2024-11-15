import express from 'express';
import { updateUser, deleteUser, getOneUser, getAllUser,  } from '../controllers/userController';

const router = express.Router()

import { verifyAdmin, verifyUser } from '../util/verifyToken';

router.put('/:id', verifyUser, updateUser);

router.delete('/:id', verifyUser, deleteUser);

router.get('/:id', verifyUser, getOneUser);

router.get('/', verifyAdmin, getAllUser);


export default router;