import jwt from "jsonwebtoken";
import { Student } from "../models/students.js";

export const authenticate = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.json(403).json({
            message: "Authorization denied. No token provided"
        })
    }

    try {
        const decodedToken = jwt.verify(token.replace('Bearer ', ''), process.env.ACCESS_TOKEN,);
        const student = await Student.findOne({where: {id: decodedToken.id}});
    
        if (!student) {
            return res.json(404).json({
                message: "Authorization denied. User not found"
            })
        }
    
        res.locals.student = student;
        next();
    } catch (error) {
        next()
    }
};
