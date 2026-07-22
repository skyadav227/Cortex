import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongodb atlas connected")
  }

  catch (error) {
    console.error("mongodb connection error:")
    console.log(error)
    process.exit(1)
  }
}

export default connectDB;