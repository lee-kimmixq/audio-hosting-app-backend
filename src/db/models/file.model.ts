import { DataTypes, Sequelize } from 'sequelize'
import { IFileModel } from '../../types/shared.types'

export const initFileModel = (sequelize: Sequelize) =>
  sequelize.define<IFileModel>(
    'file',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('UPLOADING', 'UPLOADED', 'DELETED'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      underscored: true,
    }
  )
