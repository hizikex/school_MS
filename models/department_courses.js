import { sequelize } from '../database/sequelize.js';
import { Model, DataTypes } from 'sequelize';

export class DepartmentCourse extends Model {}

DepartmentCourses.init({
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'department_courses'
});
