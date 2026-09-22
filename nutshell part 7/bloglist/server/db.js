import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connect = async () => {
  const uri = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Database URI is missing')
  }

  await mongoose.connect(uri)
}
