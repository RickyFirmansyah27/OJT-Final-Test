import express from "express";
import {
    getLembur,
    getLemburById,
    createLembur,
    updateLembur,
    deleteLembur
} from "../controllers/Lembur.js";
import { verifyUser } from "../middleware/AuthUser.js";
// import { getDataLembur } from "../middleware/CacheData.js";

const router = express.Router();

router.get('/lembur', verifyUser, getLembur);
router.get('/lembur/:id', verifyUser, getLemburById);
router.post('/lembur', verifyUser, createLembur);
router.patch('/lembur/:id', verifyUser, updateLembur);
router.delete('/lembur/:id', verifyUser, deleteLembur);

export default router;