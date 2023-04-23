import express from 'express'
import { IFileController } from '../controllers/files.controller'
import checkAuth from '../middleware/auth.middleware'

const router = express.Router()

export const fileRouter = (controller: IFileController) => {
  const { index, view, create } = controller

  router.get('/', checkAuth, index)
  router.get('/:id', checkAuth, view)
  router.post('/new', checkAuth, create)

  return router
}
