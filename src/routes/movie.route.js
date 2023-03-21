import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../controllers/movie.controller.js";
import validation from "../middlewares/validation.middleware.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, restrictTo("ADMIN", "EDITOR"), validateRequest, addMovie)
    .get(getAllMovies)
router.route("/:id")
    .get(getMovie)
    .put(authenticateToken, restrictTo("ADMIN", "EDITOR"), validateRequest, updateMovie)
    .delete(authenticateToken, restrictTo("ADMIN", "EDITOR"), validateRequest, deleteMovie)


export default router;