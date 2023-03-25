import express from "express"
import { authenticateToken, restrictTo } from "../controllers/auth.controller.js";
import { createPerson, deletePerson, getAllPerson, getPerson, updatePerson } from "../controllers/company.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .post(authenticateToken, createPerson)
    .get(getAllPerson)
router.route("/:id")
    .get(getPerson)
    .put(authenticateToken, restrictTo(["ADMIN"]), validateRequest, updatePerson)
    .delete(authenticateToken, restrictTo(["ADMIN"]), validateRequest, deletePerson)


export default router;