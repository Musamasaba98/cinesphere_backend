import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createLanguage, deleteLanguage, getAllLanguages, getLanguage, updateLanguage } from "../controllers/language.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createLanguage)
    .get(getAllLanguages)
router.route("/:id")
    .get(getLanguage)
    .patch(authenticateToken, restrictTo(["USER", "ADMIN"]), updateLanguage)
    .delete(authenticateToken, restrictTo(["USER", "ADMIN"]), deleteLanguage)


export default router;