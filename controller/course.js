import { Department } from "../models/departments.js";
import { logger } from "../utils/logger.js";
import { Course } from "../models/courses.js";
import { DepartmentCourse } from "../models/department_courses.js";
import { Student } from "../models/students.js";

export const createCourse = async (req, res) => {
  try {
    const { name, departments } = req.body;

    const departmentsExist = await Promise.all(
      departments.map((departmentName) =>
        Department.findOne({
          where: { name: departmentName },
        })
      )
    );

    console.log(departmentsExist);

    if (departments.some((department) => !department)) {
      return res.status(404).json({
        message: "Department with name does not exist",
      });
    }

    const courseExist = await Course.findOne({
      where: { name: name },
    });

    if (courseExist) {
      return res.send("Course already exist");
    }

    const newCourse = await Course.create({
      name: name,
    });

    await Promise.all(
      departmentsExist.map((department) =>
        DepartmentCourse.create({
          department_id: department.id,
          course_id: newCourse.id,
        })
      )
    );

    logger.info("Course registered successful");

    res.status(200).json({
      message: "Course registered successful",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();

    return res.status(200).json({
      message: "Courses we offer",
      data: courses ? courses.map((courses) => courses) : [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
