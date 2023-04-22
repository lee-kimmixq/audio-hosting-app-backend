import dotenv from 'dotenv'

dotenv.config()

export const sequelizeConfig: {
  [x in ProcessEnv.NODE_ENV]: any
} = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD || null,
    database: process.env.POSTGRES_DB,
    host: '127.0.0.1',
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
}
