import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createKeyword, deleteKeyword, getAllKeywords, getKeyword, updateKeyword } from "../controllers/keyword.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createKeyword)
    .get(getAllKeywords)
router.route("/:id")
    .get(getKeyword)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updateKeyword)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deleteKeyword)


export default router;