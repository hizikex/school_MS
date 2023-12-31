import express from "express";
import {
  getAllStudents,
  getStudentProfile,
  processUserLogin,
  registerStudent,
  changePassword,
  updateStudentDepartment,
} from "../controller/student.js";
import { authenticate } from "../middleware/authenticate.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("Welcome to this HIGH SCHOOL");
});

Router.post("/api/:departmentId/register", registerStudent);
Router.post("/api/login", processUserLogin);
Router.get("/api/all-students", authenticate, getAllStudents);
Router.get("/api/student/:id", authenticate, getStudentProfile);
Router.put("/api/student/:id", authenticate, changePassword);
Router.patch("/api/student", authenticate, updateStudentDepartment);

export { Router as userRoutes };
