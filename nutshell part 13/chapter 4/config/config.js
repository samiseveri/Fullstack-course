require('dotenv').config()

const databaseUrl = process.env.TESTING === 'true'
  ? process.env.TEST_DATABASE_URL
  : process.env.DATABASE_URL

const useSsl = databaseUrl && !databaseUrl.includes('localhost') && !databaseUrl.includes('127.0.0.1')

const config = {
  url: databaseUrl,
  dialect: 'postgres',
  migrationStorageTableName: 'migrations',
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {}
}

module.exports = {
  development: config,
  test: config
}
