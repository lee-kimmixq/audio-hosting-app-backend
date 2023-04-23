import { Response } from 'express'
import { RequestWithUserContext } from '../types/shared.types'

export interface IFileController {
  index: (req: RequestWithUserContext, res: Response) => Promise<void>
  view: (req: RequestWithUserContext, res: Response) => Promise<void>
  create: (req: RequestWithUserContext, res: Response) => Promise<void>
}

export const initFileController = (db: any): IFileController => {
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

  const view = async (req: RequestWithUserContext, res: Response) => {
    const userId = req.context?.user?.id
    const { id } = req.params

    try {
      const file = await db.File.findByPk(id, {
        where: { userId },
        include: {
          model: db.Category,
        },
      })
      res.send({ file })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const create = async (req: RequestWithUserContext, res: Response) => {
    const userId = req.context?.user?.id
    const { description, path } = req.body

    try {
      const file = await db.File.create({
        userId,
        description,
        path,
      })
      res.send({ file })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  return { index, view, create }
}
