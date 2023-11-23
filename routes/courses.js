import express from "express";
import { createCourse } from "../controller/course.js";

const Router = express.Router();

Router.post("/api/course", createCourse);

export { Router as courseRoutes };
