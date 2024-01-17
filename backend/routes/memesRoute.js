import express from "express";
import upload from "../middleware/multer.js";
import {addMeme, deleteMeme, getAllMemes, getMemeById,updateMeme } from "../controllers/memeController.js";
import protect from "../middleware/protectedMiddleware.js";
const router = express.Router();


router.get("/getallMemes", getAllMemes);
router.get("/:MemeId", getMemeById);
router.delete('/:MemeId',protect, deleteMeme);
router.post("/addMeme", upload.single('img'), protect,addMeme);
router.patch("/update/:MemeId",upload.single('img'),protect,updateMeme);


export default router;