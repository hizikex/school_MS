import { sequelize } from '../database/sequelize.js';
import { Model, DataTypes } from 'sequelize';
import { Department } from './departments.js';

export class Student extends Model {}

Student.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'students',
  modelName: 'Student'
});

Student.belongsTo(Department, {
  foreignKey: 'id',
  as: 'department'
});