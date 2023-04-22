import express from 'express'
import { IUserController } from '../controllers/users.controller'

const router = express.Router()

export const userRouter = (controller: IUserController) => {
  const { login, signup, logout } = controller

  router.post('/login', login)
  router.post('/signup', signup)
  router.delete('/logout', logout)

  return router
}
