import express from 'express'
import { ICategoryController } from '../controllers/categories.controller'
import checkAuth from '../middleware/auth.middleware'

const router = express.Router()

export const categoryRouter = (controller: ICategoryController) => {
  const { index, create } = controller

  router.get('/', checkAuth, index)
  router.post('/new', checkAuth, create)

  return router
}
