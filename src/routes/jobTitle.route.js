import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createJobTitle, deleteJobTitle, getAllJobTitles, getJobTitle, updateJobTitle } from "../controllers/jobTitle.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createJobTitle)
    .get(getAllJobTitles)
router.route("/:id")
    .get(getJobTitle)
    .patch(authenticateToken, restrictTo(["USER", "ADMIN"]), updateJobTitle)
    .delete(authenticateToken, restrictTo(["USER", "ADMIN"]), deleteJobTitle)


export default router;