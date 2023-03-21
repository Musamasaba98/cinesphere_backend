import express from "express"
import { login, signup, token } from "../controllers/auth.controller.js";
import { deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import validation from "../middlewares/validation.middleware.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .get(findAllUsers)
router.route("/:id")
    .get(findUser)
    .put(updateUser)
    .delete(deleteUser)
router.post('/token', token)
router.post("/login", validateRequest, login)
router.post("/signup", validateRequest, signup)
export default router;
