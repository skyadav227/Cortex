import express from "express"
import authRoutes from "./routes/auth.js"
import connectDB from "./config/database.js"
import checkAuth from "./middleware/authMiddleware.js"
import User from "./models/user.js"
import dotenv from "dotenv"
import cors from "cors"
import chatRoutes from "./routes/chat.js"
import aiRoutes from "./routes/ai.js"

dotenv.config()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json())

app.get("/", (req, res) => {
  res.send("cortex backend is running.......")
})

app.use("/auth", authRoutes)

app.use("/chats", chatRoutes)

app.use("/api/ai", aiRoutes)

const startServer = async () => {
  await connectDB()
  app.listen(process.env.PORT, "0.0.0.0", () => {
  }) 
}

startServer()

