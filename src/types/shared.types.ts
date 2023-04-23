import { Request } from 'express'
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelCtor,
  Sequelize,
} from 'sequelize'

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

export interface IDatabase {
  sequelize: Sequelize
  Sequelize: typeof Sequelize
  User: ModelCtor<IUserModel>
  File: ModelCtor<IFileModel>
  Category: ModelCtor<ICategoryModel>
}

export interface IUserModel
  extends Model<
    InferAttributes<IUserModel>,
    InferCreationAttributes<IUserModel>
  > {
  id: CreationOptional<number>
  username: string
  password: string
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}

export interface IFileModel
  extends Model<
    InferAttributes<IFileModel>,
    InferCreationAttributes<IFileModel>
  > {
  id: CreationOptional<number>
  userId: string
  description: string | null
  path: string
  status: EFileStatus
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
  setCategories?: any
}

export interface ICategoryModel
  extends Model<
    InferAttributes<ICategoryModel>,
    InferCreationAttributes<ICategoryModel>
  > {
  id: CreationOptional<number>
  name: string
  createdAt: CreationOptional<Date>
  updatedAt: CreationOptional<Date>
}
