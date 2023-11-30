import { Department } from "../models/departments.js";
import { Student } from "../models/students.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";

export const registerStudent = async (req, res) => {
  try {
    const { fullname, year, email, password, gender } = req.body;

    const departmentExist = await Department.findOne({
      where: { id: req.params.departmentId },
    });

    if (!departmentExist) {
      return res.send("Department does not exist");
    }

    const userExist = await Student.findOne({ where: { email: email } });
    if (userExist) {
      return res.send("Student with email already exist");
    }

    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, saltPassword);

    const newStudent = await Student.create({
      department_id: departmentExist.id,
      fullname: fullname,
      year: year,
      email: email,
      password: hashPassword,
      gender: gender,
    });

    return res.status(200).json({
      message: "Student registered successful",
      data: newStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const processUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await Student.findOne({ where: { email: email } });

  if (!userExist) {
    return res.status(403).json({
      message: "User not found",
    });
  }

  const isPassword = await bcrypt.compare(password, userExist.password);
  if (!isPassword) {
    return res.status(403).json({
      message: "Password incorrect",
    });
  }

  const generateToken = jwt.sign(
    {
      id: userExist.id,
      email: userExist.email,
      department_id: userExist.department_id,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "12h",
    }
  );

  const result = {
    id: userExist.id,
    department_id: userExist.department_id,
    fullname: userExist.fullname,
    email: userExist.email,
    address: userExist.address,
    phone: userExist.phone,
    token: generateToken,
  };

  res.status(200).json({
    message: "Login successful",
    data: result,
  });

  logger.info("Student Logged in successfully");
};

export const getAllStudents = async (req, res) => {
  try {
    const limit = 5;
    const page = req.query.page ? req.query.page : 1;
    const offset = (page - 1) * limit;

    const student = res.locals.student;

    if (!student) {
      return res.status(401).json({
        message: "Student is not logged in",
      });
    }

    const students = await Student.findAll({ limit, offset });

    return res.status(200).json({
      message: "All students",
      data: students ? students.map((students) => students) : [],
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Department,
          as: "department",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: `${student.fullname} profile`,
      data: student,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const student = res.locals.student;
    const { currentPassword, newPassword } = req.body;
    const updatedStudent = await Student.findOne({
      where: { id: req.params.id },
    });

    if (!student) {
      return res.status(403).json({
        message: "Student not found",
      });
    } else if (student.id !== updatedStudent.id) {
      return res.status(403).json({
        message: "Cannot update another student's password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      student.password
    );

    if (!passwordMatch) {
      return res.status(403).json({
        message: "Incorrect password",
      });
    }

    const saltPassword = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, saltPassword);

    updatedStudent.password = hashPassword;
    const StudentUpdate = await updatedStudent.save();

    if (!StudentUpdate) {
      return res.status(403).json({
        message: "Student not updated",
      });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      data: StudentUpdate,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudentDepartment = async (req, res) => {
  const student = res.locals.student;
  const { department_id } = req.body;
  const department = await Department.findOne({ where: { id: department_id } });

  if (!department) {
    return res.status(404).json({
      message: "Department not found",
    });
  } else if (student.department_id === department_id) {
    return res.status(404).json({
      message: "Cannot update id with same value",
    });
  }

  const updatedStudentDepartment = await Student.update(
    { department_id: department_id },
    { where: { id: student.id } }
  );
  
  console.log(updatedStudentDepartment);
if (updatedStudentDepartment == 0) {
    return res.status(403).json({
      message: "Student department not updated",
    });
  }

  const updatedStudent = await Student.findOne({ where: { id: department_id } });
  res.status(200).json({
    message: "Department updated successfully",
    data: updatedStudent
  });
};
