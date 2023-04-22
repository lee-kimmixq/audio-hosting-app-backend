import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_TOKEN_KEY } from '../config'
import { Error } from '../errors'
import { getHash } from '../utils'

export interface IUserController {
  login: (req: Request, res: Response) => Promise<void>
  signup: (req: Request, res: Response) => Promise<void>
  logout: (_: Request, res: Response) => Promise<void>
}

export const initUserController = (db: any): IUserController => {
  const login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const user = await db.User.findOne({ where: { username } })

      if (!user) {
        res.status(Error.INVALID_LOGIN.httpCode).send(Error.INVALID_LOGIN)
        return
      }

      if (user.password !== getHash(password)) {
        res.status(Error.INVALID_LOGIN.httpCode).send(Error.INVALID_LOGIN)
        return
      }

      const payload = { id: user.id }
      const token = jwt.sign(payload, JWT_TOKEN_KEY!)
      const cookieOptions = { httpOnly: true }

      res.cookie('jwt', token, cookieOptions)
      res.send({ login: true })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const signup = async (req: Request, res: Response) => {
    try {
      const { username, password, confirmPassword } = req.body

      if (password !== confirmPassword) {
        res
          .status(Error.SIGNUP_INVALID_PASSWORD.httpCode)
          .send(Error.SIGNUP_INVALID_PASSWORD)
        return
      }

      const hashedPassword = getHash(password)
      await db.User.create({
        username,
        password: hashedPassword,
      })

      res.send({ signup: true })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const logout = async (_: Request, res: Response) => {
    res.clearCookie('jwt')
    res.send({ logout: true })
  }

  return { login, signup, logout }
}
