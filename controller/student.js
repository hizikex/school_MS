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
      res.send("Department does not exist");
    }

    const userExist = await Student.findOne({ where: { email: email } });
    if (userExist) {
      res.send("Student with email already exist");
    }

    const newStudent = await Student.create({
      department_id: departmentExist.id,
      fullname: fullname,
      year: year,
      email: email,
      password: password,
      gender: gender,
    });

    res.status(200).json({
      message: "Student registered successful",
      data: newStudent,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const processUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await Student.findOne({ where: { email: email } });
  if (!userExist) {
    res.status(404).json({
      message: "Email or password incorrect",
    });
  }

  const isPassword = bcrypt.compare(password, userExist.password);
  if (!isPassword) {
    res.status(404).json({
      message: "Password incorrect",
    });
  }

  const generateToken = jwt.sign(
    {
      id: userExist.id,
      email: userExist.email,
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
  const student = res.locals.student;
  console.log(student);

  if (!student) {
    return res.status(401).json({
      message: "Student is not logged in",
    });
  }

  const allStudents = await Student.findAll();

  if (allStudents.length === 0) {
    return res.status(401).json({
      message: "No student found",
    });
  }

  return res.status(200).json({
    message: "All students",
    data: allStudents,
  });
};
