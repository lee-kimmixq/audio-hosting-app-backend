import { Sequelize } from 'sequelize'
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from '../../config'
import { IDatabase } from '../../types/shared.types'

import { initCategoryModel } from './category.model'
import { initFileModel } from './file.model'
import { initUserModel } from './user.model'

export const sequelize = new Sequelize(
  POSTGRES_DB!,
  POSTGRES_USER!,
  POSTGRES_PASSWORD!,
  {
    host: POSTGRES_HOST!,
    dialect: 'postgres',
  }
)

const db: IDatabase = {
  sequelize,
  Sequelize,
  User: initUserModel(sequelize),
  File: initFileModel(sequelize),
  Category: initCategoryModel(sequelize),
}

db.User.hasMany(db.File)
db.File.belongsTo(db.User)

db.File.belongsToMany(db.Category, {
  through: 'file_categories',
})
db.Category.belongsToMany(db.File, {
  through: 'file_categories',
})

export { db }
