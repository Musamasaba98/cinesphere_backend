import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createMovieCast, deleteMovieCast, getAllMovieCasts, getMovieCast, updateMovieCast } from "../controllers/movieCast.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createMovieCast)
    .get(getAllMovieCasts)
router.route("/:id")
    .get(getMovieCast)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateMovieCast)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteMovieCast)


export default router;