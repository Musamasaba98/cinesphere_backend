import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createJobTitle, deleteJobTitle, getAllJobTitle, getJobTitle, updateJobTitle } from "../controllers/company.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createJobTitle)
    .get(getAllJobTitle)
router.route("/:id")
    .get(getJobTitle)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateJobTitle)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteJobTitle)


export default router;