const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const { MONGO_URL } = require('../util/config')

const connectWithRetry = async (maxAttempts = 30) => {
  if (!MONGO_URL) {
    console.log('No MONGO_URL set, MongoDB is disabled')
    return
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await mongoose.connect(MONGO_URL)
      console.log('Connected to MongoDB')
      return
    } catch (err) {
      console.log(`MongoDB connection attempt ${attempt}/${maxAttempts} failed: ${err.message}`)
      if (attempt === maxAttempts) {
        throw err
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }
}

module.exports = {
  Todo,
  connectWithRetry
}
