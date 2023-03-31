import express from "express"
import { authenticateToken, getMeHandler, login, logout, signup, token, updatePassword } from "../controllers/auth.controller.js";
import { deleteUser, findAllUsers, findUser, updateUser } from "../controllers/user.controller.js";
import validation from "../middlewares/validation.middleware.js";
import { uploadImage } from "../config/multer.config.js";


const validateRequest = validation(true)
const router = express.Router()

router.route("/")
    .get(findAllUsers)

router.route("/me").get(authenticateToken, getMeHandler)
router.route('/token').get(token)
router.route("/:id")
    .get(findUser)
    .patch(updateUser)
    .delete(deleteUser)
router.route("/updateAuth/:id").patch(updatePassword)
router.post("/login", validateRequest, login)
router.post("/logout", logout)
router.post("/signup", uploadImage.single("image"), signup)
export default router;
