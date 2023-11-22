import { sequelize } from '../database/sequelize.js';
import { Model, DataTypes } from 'sequelize';

export class Department extends Model {}

Department.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  tableName: 'departments'
});
