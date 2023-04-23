import express from 'express'
import multer, { memoryStorage } from 'multer'

import { IFileController } from '../controllers/files.controller'
import checkAuth from '../middleware/auth.middleware'

const router = express.Router()

export const fileRouter = (controller: IFileController) => {
  const { index, create } = controller

  const storage = memoryStorage()
  const upload = multer({ storage })

  router.get('/', checkAuth, index)
  router.post('/new', checkAuth, upload.single('audiofile'), create)

  return router
}
