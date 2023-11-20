import { Department } from "../models/departments.js";

export const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        const departmentExist = await Department.findOne({ where: { name: name } });
        if (departmentExist) {
            return res.send("Department with name already exist")
        }
         
        const newDepartment = await Department.create({ name: name });
    
        res.status(200).json({
            message: "Department created successful",
            data: newDepartment
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
};
