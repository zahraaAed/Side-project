import express from "express";
import { registerUser } from "../controllers/userController";


const router = express.Router();
router.post("/addUser",registerUser);

export default router;