import { NextFunction, Response } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'

import { JWT_TOKEN_KEY } from '../config'
import { ACCESS_COOKIE_NAME } from '../constants'
import { Error } from '../errors'
import { RequestWithUserContext } from '../types/shared.types'
import { db } from '../db/models/index'

async function checkAuth(
  req: RequestWithUserContext,
  res: Response,
  next: NextFunction
) {
  const accessCookie = req.cookies[ACCESS_COOKIE_NAME]

  if (!accessCookie)
    return res
      .status(Error.TOKEN_NOT_FOUND.httpCode)
      .send(Error.TOKEN_NOT_FOUND)

  jwt.verify(
    accessCookie,
    JWT_TOKEN_KEY!,
    {},
    async (err: VerifyErrors | null, user?: any) => {
      if (err) return res.sendStatus(403)

      const userId = user?.id
      const existingUser = await db.User.findOne({ where: { id: userId } })

      if (!existingUser) {
        res.status(Error.INVALID_TOKEN.httpCode).send(Error.INVALID_TOKEN)
        return
      }

      req.context = {
        user,
      }
      next()
      return
    }
  )
  return
}

export default checkAuth
