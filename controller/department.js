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

export const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findOne({ where: {id: req.params.id} });

        if(!department) {
            return res.status(404).json({
                message: "Department not found",
            })
        }

        const updatedDepartment = await Department.update({ name: req.body.name }, {where: { id: department.id } });

        console.log(updatedDepartment);
        if(updatedDepartment == 0) {
            return res.status(403).json({
                message: "Department not updated",
            })
        }
    
        res.status(200).json({
            message: "Department updated successfully",
            data: await Department.findOne({where: { id: req.params.id } })
        })
    } catch (error) {
        return res.status(200).json({
            message: error.message
        })
    }
};
