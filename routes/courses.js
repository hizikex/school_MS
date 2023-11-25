import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createCourse, getAllCourses } from "../controller/course.js";

const Router = express.Router();

Router.post("/api/course", authenticate, createCourse);
Router.get("/api/courses", getAllCourses);

export { Router as courseRoutes };
