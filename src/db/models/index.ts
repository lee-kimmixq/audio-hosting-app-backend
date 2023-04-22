import { Sequelize } from 'sequelize'
import {
  HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from '../../config'

import { initUserModel } from './user.model'

export const sequelize = new Sequelize(
  POSTGRES_DB!,
  POSTGRES_USER!,
  POSTGRES_PASSWORD!,
  {
    host: HOST!,
    dialect: 'postgres',
  }
)

const db = {
  sequelize,
  Sequelize,
  User: initUserModel(sequelize),
}

export { db }
