import { Sequelize } from 'sequelize'
import sequelizeConfig from '../config'

import { initUserModel } from './user'

const { NODE_ENV = 'development' } = process.env
const config = sequelizeConfig[NODE_ENV]

export const sequelize = new Sequelize(
  config?.database,
  config?.username,
  config?.password,
  config
)

const db = {
  sequelize,
  Sequelize,
  User: initUserModel(sequelize),
}

export { db }
