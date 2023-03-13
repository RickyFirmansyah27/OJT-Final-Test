import express from "express";
import {
    getReimburst,
    getReimburstById,
    createReimburst,
    updateReimburst,
    deleteReimburst
} from "../controllers/Reimburst.js";
import { verifyUser } from "../middleware/AuthUser.js";
// import { getDataReimburst } from "../middleware/CacheData.js";

const router = express.Router();

router.get('/reimburst', verifyUser, getReimburst);
router.get('/reimburst/:id', verifyUser, getReimburstById);
router.post('/reimburst', verifyUser, createReimburst);
router.patch('/reimburst/:id', verifyUser, updateReimburst);
router.delete('/reimburst/:id', verifyUser, deleteReimburst);

export default router;