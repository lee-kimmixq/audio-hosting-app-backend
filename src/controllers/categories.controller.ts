import { Request, Response } from 'express'

export interface ICategoryController {
  index: (_: Request, res: Response) => Promise<void>
  create: (req: Request, res: Response) => Promise<void>
}

export const initCategoryController = (db: any): ICategoryController => {
  const index = async (_: Request, res: Response) => {
    try {
      const categories = await db.Category.findAll({ order: [['name', 'ASC']] })
      res.send({ categories })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const create = async (req: Request, res: Response) => {
    const { name } = req.body

    try {
      const category = await db.Category.create({
        name,
      })
      res.send({ category })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  return { index, create }
}
