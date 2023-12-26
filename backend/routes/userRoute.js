import express from "express";
import { signInUser, registerUser } from "../controllers/userController.js";


const router = express.Router();
router.post("/addUser",registerUser);
router.post("/login",signInUser)
export default router;

