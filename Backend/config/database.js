import mongoose from "mongoose"

const connectDB = async () => {
  try {
    console.log("mongo_url =", process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL)
  }

  catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export default connectDB;