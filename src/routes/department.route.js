import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createDepartment, deleteDepartment, getAllDepartments, getDepartment, updateDepartment } from "../controllers/department.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createDepartment)
    .get(getAllDepartments)
router.route("/:id")
    .get(getDepartment)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateDepartment)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteDepartment)


export default router;