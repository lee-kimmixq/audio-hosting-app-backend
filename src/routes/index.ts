import { Express } from 'express'
import { db } from '../db/models/index'

import { categoryRouter } from './category.router'
import { fileRouter } from './file.router'
import { userRouter } from './user.router'

import { initCategoryController } from '../controllers/categories.controller'
import { initFileController } from '../controllers/files.controller'
import { initUserController } from '../controllers/users.controller'

export const bindRoutes = (app: Express) => {
  const UserController = initUserController(db)
  const CategoryController = initCategoryController(db)
  const FileController = initFileController(db)

  app.use('/user', userRouter(UserController))
  app.use('/category', categoryRouter(CategoryController))
  app.use('/file', fileRouter(FileController))
}
