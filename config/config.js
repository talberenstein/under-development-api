require('dotenv').config()

const dbDetails = {
  username: process.env.DB_USERNAME,
  username: process.env.DB_PASSWORD,
  username: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_DIALECT,
}

module.exports = {
  development: dbDetails,
  production: dbDetails
}