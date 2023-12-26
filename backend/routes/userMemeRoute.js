import express from "express";
import { getMemesForUsers } from "../controllers/userMeme.js";

const router = express.Router();
router.get('/users/:userId', getMemesForUsers);

export default router;
