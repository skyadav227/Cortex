import { Router } from "express";
import { signup, login } from "../controllers/authController.js"
import checkAuth from "../middleware/authMiddleware.js";
import User from "../models/user.js";

const router = Router()

router.post("/signup", signup)

router.post("/login", login)

router.get("/profile", checkAuth, async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json(user)
})

export default router