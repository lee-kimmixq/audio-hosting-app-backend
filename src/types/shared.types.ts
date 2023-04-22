import { Request } from 'express'

export interface JwtPayload {
  id: string
}

export interface RequestWithUserContext extends Request {
  context?: {
    user: JwtPayload
  }
}
