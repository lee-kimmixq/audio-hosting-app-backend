import express from 'express'
import { IUserController } from '../controllers/users.controller'
import checkAuth from '../middleware/auth.middleware'

const router = express.Router()

export const userRouter = (controller: IUserController) => {
  const { login, signup, logout, changePassword, deleteAccount } = controller

  router.post('/login', login)
  router.post('/signup', signup)
  router.delete('/logout', logout)
  router.put('/change-password', checkAuth, changePassword)
  router.delete('/delete-account', checkAuth, deleteAccount)

  return router
}
