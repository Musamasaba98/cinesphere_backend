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
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateLanguage)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteLanguage)


export default router;