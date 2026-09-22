const { Sequelize } = require('sequelize')

const databaseUrl = process.env.DATABASE_URL
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

module.exports = sequelize
