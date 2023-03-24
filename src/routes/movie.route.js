import express from "express"
import { uploadImage, uploadVideo } from "../config/multer.config.js";
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../controllers/movie.controller.js";
import validation from "../middlewares/validation.middleware.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, uploadImage.fields([
        { name: "coverUrl", maxCount: 1 },
        { name: "imageUrl", maxCount: 1 }]),
        addMovie)
    .get(getAllMovies)
router.route("/:id")
    .get(getMovie)
    .patch(authenticateToken, updateMovie)
    .delete(authenticateToken, deleteMovie)


export default router;