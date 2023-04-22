const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.HOST,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
}
