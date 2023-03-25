import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createCompany, deleteCompany, getAllCompanys, getCompany, updateCompany } from "../controllers/company.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createCompany)
    .get(getAllCompanys)
router.route("/:id")
    .get(getCompany)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateCompany)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteCompany)


export default router;