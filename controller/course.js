import { Department } from "../models/departments.js";
import { logger } from "../utils/logger.js";
import { Course } from "../models/courses.js";
import { DepartmentCourse } from "../models/department_courses.js";

export const createCourse = async (req, res) => {
  try {
    const { name, departments } = req.body;

    const departmentsExist = await Promise.all(
        departments.map((departmentName) => 
            Department.findOne({
                where: { name: departmentName }
            })
        )
    );

    if (departments.some((department) => !department)) {
        return res.status(404).json({
            message: "Department with name does not exist"
        })
    }

    const courseExist = await Course.findOne({
        where: { name: name }
      });
  
      if (courseExist) {
        return res.send("Course already exist");
      }
  
      const newCourse = await Course.create({
          name: name
      });

    await Promise.all(
        departmentsExist.map((department) => 
            DepartmentCourse.create({
                department_id: department.id,
                course_id: newCourse.id
            })
        )
    )

    logger.info("Course registered successful")

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
