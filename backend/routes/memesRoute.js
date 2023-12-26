import express from "express";
import upload from "../middleware/multer.js";
import { addMeme, deleteMeme, getAllMemes, getMemeById,updateMeme } from "../controllers/memeController.js";

const router = express.Router();


router.get("/getallMemes", getAllMemes);
router.get('/:MemeId', getMemeById);
router.delete('/:MemeId', deleteMeme);
router.post("/addMeme", upload.single('img'), addMeme);
router.patch("/update/:MemeId",upload.single('img'),updateMeme);


export default router;