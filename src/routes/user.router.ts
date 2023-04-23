import express from 'express'
import { IUserController } from '../controllers/users.controller'
import checkAuth from '../middleware/auth.middleware'

const router = express.Router()

export const userRouter = (controller: IUserController) => {
  const {
    login,
    signup,
    logout,
    changePassword,
    deleteAccount,
    checkAuth: checkUserAuth,
  } = controller

  router.post('/login', login)
  router.post('/signup', signup)
  router.delete('/logout', logout)
  router.put('/change-password', checkAuth, changePassword)
  router.delete('/delete-account', checkAuth, deleteAccount)
  router.get('/check-auth', checkAuth, checkUserAuth)

  return router
}
