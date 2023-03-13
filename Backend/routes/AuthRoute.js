import express from "express";
import {getHR, Login, logOut, Me} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);

//Auth
router.get('/role/:role', getHR);

export default router;