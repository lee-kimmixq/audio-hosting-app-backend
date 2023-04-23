import { Express } from 'express'
import { db } from '../db/models/index'

import { userRouter } from './user.router'

import { initUserController } from '../controllers/users.controller'
import { initCategoryController } from '../controllers/categories.controller'
import { categoryRouter } from './category.router'

export const bindRoutes = (app: Express) => {
  const UserController = initUserController(db)
  const CategoryController = initCategoryController(db)

  app.use('/user', userRouter(UserController))
  app.use('/category', categoryRouter(CategoryController))
}
