import { Response } from 'express'
import {
  EFileStatus,
  IDatabase,
  RequestWithUserContext,
} from '../types/shared.types'
import { Error } from '../errors'
import { uploadAudio } from '../services/s3.service'
import { AWS_BUCKET_NAME, AWS_S3_ENDPOINT } from '../config'

export interface IFileController {
  index: (req: RequestWithUserContext, res: Response) => Promise<void>
  create: (req: RequestWithUserContext, res: Response) => Promise<void>
}

export const initFileController = (db: IDatabase): IFileController => {
  const index = async (req: RequestWithUserContext, res: Response) => {
    const userId = req.context?.user?.id

    try {
      const files = await db.File.findAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
        include: {
          model: db.Category,
        },
      })
      res.send({ files })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const create = async (req: RequestWithUserContext, res: Response) => {
    const userId = req.context?.user?.id!
    const { description, categoryId } = req.body

    const category = await db.Category.findByPk(categoryId)
    if (!category) {
      res
        .status(Error.CATEGORY_NOT_FOUND.httpCode)
        .send(Error.CATEGORY_NOT_FOUND)
      return
    }

    const filename = req.file?.originalname
    const file = req.file?.buffer
    await uploadAudio(filename, file)

    try {
      const file = await db.File.create({
        userId,
        description,
        path: `${AWS_S3_ENDPOINT}${AWS_BUCKET_NAME}/${AWS_BUCKET_NAME}/${filename}`,
        status: EFileStatus.UPLOADING,
      })
      await file.setCategories([categoryId])
      res.send({ file })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  return { index, create }
}
