import express from "express";
import { chatWithAI, generateTitle } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chatWithAI);

router.post("/title", generateTitle);

export default router;