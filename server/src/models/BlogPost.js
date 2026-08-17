import { DataTypes } from 'sequelize'
import { sequelize } from '../db.js'

export const BlogPost = sequelize.define('BlogPost', {
  id: { type: DataTypes.STRING, primaryKey: true },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  excerpt: { type: DataTypes.STRING(400), allowNull: false, defaultValue: '' },
  coverImage: { type: DataTypes.STRING, allowNull: true },
  contentHtml: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' },
  published: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
}, {
  tableName: 'blog_posts',
  timestamps: true,
})
