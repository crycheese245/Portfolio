import { DataTypes } from 'sequelize'
import { sequelize } from '../db.js'

export const Admin = sequelize.define('Admin', {
  id: { type: DataTypes.STRING, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'admins',
  timestamps: true,
})
