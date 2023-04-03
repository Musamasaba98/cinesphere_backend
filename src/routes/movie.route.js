import express from "express"
import { uploadImage, uploadVideo } from "../config/multer.config.js";
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { addMovie, deleteMovie, getAllMovies, getMovie, searchMovies, updateMovieData, updateMovieImages } from "../controllers/movie.controller.js";
import validation from "../middlewares/validation.middleware.js";

const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken,
        addMovie)
    .get(getAllMovies)
router.get('/search', searchMovies)
router.route("/:id")
    .get(getMovie)
    .patch(updateMovieData)
    .delete(authenticateToken, deleteMovie)
router.patch("/:id/edit/images", authenticateToken, uploadImage.fields([
    { name: "coverUrl", maxCount: 1 },
    { name: "imageUrl", maxCount: 1 }]), updateMovieImages)

export default router;