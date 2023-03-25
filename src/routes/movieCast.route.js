import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createMovieCast, deleteMovieCast, getAllMovieCast, getMovieCast, updateMovieCast } from "../controllers/company.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createMovieCast)
    .get(getAllMovieCast)
router.route("/:id")
    .get(getMovieCast)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateMovieCast)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteMovieCast)


export default router;