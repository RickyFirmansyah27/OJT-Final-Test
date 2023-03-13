import express from "express";
import {
    getGaji,
    getGajiById,
    createGaji,
    updateGaji,
    deleteGaji
} from "../controllers/Gaji.js";
import { verifyUser } from "../middleware/AuthUser.js";
// import { getDataGaji } from "../middleware/CacheData.js";

const router = express.Router();

router.get('/gaji', verifyUser, getGaji);
router.get('/gaji/:id', verifyUser, getGajiById);
router.post('/gaji', verifyUser, createGaji);
router.patch('/gaji/:id', verifyUser, updateGaji);
router.delete('/gaji/:id', verifyUser, deleteGaji);

export default router;