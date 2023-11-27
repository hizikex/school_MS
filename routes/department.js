import express from "express";
import { createDepartment, updateDepartment } from "../controller/department.js";
import { authenticate } from "../middleware/authenticate.js";
const Router = express.Router();

Router.post("/api/department/create", createDepartment);
Router.patch("/api/department/:id", authenticate, updateDepartment);

export { Router as departmentRoutes };
