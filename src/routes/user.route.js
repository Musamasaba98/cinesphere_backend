import express from "express"
import { login, signup, token, updatePassword } from "../controllers/auth.controller.js";
import { deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import validation from "../middlewares/validation.middleware.js";
import { uploadImage } from "../config/multer.config.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .get(findAllUsers)

router.route("/:id")
    .get(findUser)
    .patch(updateUser)
    .delete(deleteUser)
router.route("/updateAuth/:id").patch(updatePassword)
router.post('/token', token)
router.post("/login", validateRequest, login)
router.post("/signup", uploadImage.single("image"), signup)
export default router;
