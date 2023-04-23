import { Sequelize } from 'sequelize'
import {
  HOST,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from '../../config'

import { initCategoryModel } from './category.model'
import { initFileModel } from './file.model'
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
