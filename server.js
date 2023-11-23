import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import { logger } from "./utils/logger.js";
import { sequelize } from "./database/sequelize.js";
import { userRoutes } from "./routes/students.js";
import { departmentRoutes } from "./routes/department.js";
import { courseRoutes } from './routes/courses.js';

const app = express();

app.use(express.json());
app.use("/", userRoutes);
app.use("/", departmentRoutes);
app.use("/", courseRoutes);

try {
  await sequelize.authenticate();
  logger.info("Connection has been established successfully.");
} catch (error) {
  logger.error("Unable to connect to the database:", error);
}

app.listen(process.env.APP_PORT, () => {
  logger.info("App is listening on PORT " + process.env.APP_PORT);
});
