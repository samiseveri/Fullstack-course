const Sequelize = require('sequelize')
const { DATABASE_URL, TEST_DATABASE_URL } = require('./config')

const databaseUrl = process.env.TESTING === 'true' ? TEST_DATABASE_URL : DATABASE_URL
const useSsl = databaseUrl && !databaseUrl.includes('localhost') && !databaseUrl.includes('127.0.0.1')

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {}
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (error) {
    console.log('failed to connect to the database')
    console.log(error)
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }
