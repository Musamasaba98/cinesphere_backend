import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { addGenre, deleteGenre, getAllGenries, getGenre, updateGenre } from "../controllers/genre.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, restrictTo(["ADMIN"]), validateRequest, addGenre)
    .get(getAllGenries)
router.route("/:id")
    .get(getGenre)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateGenre)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteGenre)


export default router;