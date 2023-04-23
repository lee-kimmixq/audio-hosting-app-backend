import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT_TOKEN_KEY } from '../config'
import { ACCESS_COOKIE_NAME } from '../constants'
import { Error } from '../errors'
import { RequestWithUserContext } from '../types/shared.types'
import { getHash } from '../utils'

export interface IUserController {
  login: (req: Request, res: Response) => Promise<void>
  signup: (req: Request, res: Response) => Promise<void>
  logout: (_: Request, res: Response) => Promise<void>
  changePassword: (req: RequestWithUserContext, res: Response) => Promise<void>
  deleteAccount: (req: RequestWithUserContext, res: Response) => Promise<void>
  checkAuth: (_: RequestWithUserContext, res: Response) => Promise<void>
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

      res.cookie(ACCESS_COOKIE_NAME, token, cookieOptions)
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

      const existingUser = await db.User.findOne({ where: { username } })
      if (existingUser) {
        res
          .status(Error.USERNAME_ALREADY_EXISTS.httpCode)
          .send(Error.USERNAME_ALREADY_EXISTS)
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
    res.clearCookie(ACCESS_COOKIE_NAME)
    res.send({ logout: true })
  }

  const changePassword = async (req: RequestWithUserContext, res: Response) => {
    try {
      const { newPassword, confirmNewPassword } = req.body

      if (newPassword !== confirmNewPassword) {
        res
          .status(Error.SIGNUP_INVALID_PASSWORD.httpCode)
          .send(Error.SIGNUP_INVALID_PASSWORD)
        return
      }

      const userId = req.context?.user?.id
      const user = await db.User.findOne({ where: { id: userId } })

      const hashedPassword = getHash(newPassword)
      user.update({ password: hashedPassword, updatedAt: new Date() })

      res.send({ changePassword: true })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const deleteAccount = async (req: RequestWithUserContext, res: Response) => {
    try {
      const { password } = req.body

      const userId = req.context?.user?.id
      const user = await db.User.findOne({ where: { id: userId } })

      if (user.password !== getHash(password)) {
        res
          .status(Error.INVALID_OPERATION.httpCode)
          .send(Error.INVALID_OPERATION)
        return
      }

      user.destroy()

      res.send({ deleteAccount: true })
    } catch (err) {
      res.status(500).send(err)
    }
  }

  const checkAuth = async (_: Request, res: Response) => {
    res.send({ auth: true })
  }

  return { login, signup, logout, changePassword, deleteAccount, checkAuth }
}
