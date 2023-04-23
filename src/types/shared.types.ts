import { Request } from 'express'

export interface JwtPayload {
  id: string
}

export interface RequestWithUserContext extends Request {
  context?: {
    user: JwtPayload
  }
}

export enum EFileStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  DELETED = 'DELETED',
}
