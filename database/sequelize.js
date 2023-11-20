import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DATABASE || "learn_mysql", process.env.USERNAME || "root", process.env.PASSWORD || "password", {
  host: process.env.HOST || "localhost",
  dialect: "mysql",
});
