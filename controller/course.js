import { Department } from "../models/departments.js";
import { Student } from "../models/students.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";
import { Course } from "../models/courses.js";
import { DepartmentCourse } from "../models/department_courses.js";

export const createCourse = async (req, res) => {
  try {
    const { name } = req.body;

    const departmentExist = await Department.findOne({ where: { id: req.params.departmentId } });

    if (departmentExist) {
        return res.send("Department with name already exist")
    }

    const courseExist = await Course.findOne({
      where: { name: name },
    });

    if (!courseExist) {
      return res.send("Course does not exist");
    }

    const newCourse = await Course.create({
        name: name
    });

    await DepartmentCourse.create({
        department_id: req.params.departmentId,
        course_id: newCourse.id
    })

    res.status(200).json({
      message: "Course registered successful",
      data: newCourse
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
