import express from "express";
import { createDepartment } from "../controller/department.js";
const Router = express.Router();

Router.post("/api/department/create", createDepartment);

export { Router as departmentRoutes };
