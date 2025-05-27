import mongoose from "mongoose"
import { logger } from "../utils/logger"
import config from "./config"

const connectDB = async () => {
  try {
    const dbUri = config.mongoURI

    if (!dbUri) {
      logger.error('MongoDB URI not found in environment variables')
      process.exit(1)
    }
    
    const { connection } = await mongoose.connect(dbUri)
    logger.info(`Connected to MongoDB: ${connection.host}`)

    return connection.host

  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export default connectDB;