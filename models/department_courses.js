import { sequelize } from '../database/sequelize.js';
import { Model, DataTypes } from 'sequelize';

export class DepartmentCourse extends Model {}

DepartmentCourse.init({
  course_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  department_id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'department_courses'
});
