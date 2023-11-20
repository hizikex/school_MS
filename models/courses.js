import { sequelize } from '../database/sequelize.js';
import { Model, DataTypes } from 'sequelize';

export class Course extends Model {}

Course.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  sequelize,
  tableName: 'courses'
});
