import { Express } from 'express'
import { db } from '../db/models/index'

import { userRouter } from './user.router'

import { initUserController } from '../controllers/users.controller'

export const bindRoutes = (app: Express) => {
  const UserController = initUserController(db)

  app.use('/user', userRouter(UserController))
}
