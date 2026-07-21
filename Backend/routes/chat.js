import { Router } from "express"
import checkAuth from "../middleware/authMiddleware.js"
import { clearChats, createChat, deleteChat, getChats, sendMessage, updateTitle } from "../controllers/chatController.js"

const router = Router()

router.get("/", checkAuth, getChats)

router.post("/", checkAuth, createChat)

router.put("/:id", checkAuth, sendMessage)

router.patch("/:id/title", checkAuth, updateTitle)

router.delete("/:id", checkAuth, deleteChat)

router.delete("/", checkAuth, clearChats)

export default router  