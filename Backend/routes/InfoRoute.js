import express from 'express';

import { addAnnouncements, createInfo, deleteInfo, getInfo, getInfoById, updateInfo } from '../controllers/Info.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

//import via excel
router.post('/info',verifyUser, addAnnouncements);

router.get('/info', getInfo);
router.get('/info/:id', getInfoById);
router.post('/add/info',  verifyUser ,createInfo);
router.patch('/info/:id', verifyUser, updateInfo);
router.delete('/info/:id', verifyUser, deleteInfo);


export default router;
