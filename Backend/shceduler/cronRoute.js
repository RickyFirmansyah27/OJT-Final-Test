import express from "express";
import { getLemburByStatus, getReimburstByStatus } from "../controllers/Cronjob.js";

const router = express.Router();

router.get('/overtimeCheck/:status', getLemburByStatus);
router.get('/reimburstCheck/:status', getReimburstByStatus);

export default router;