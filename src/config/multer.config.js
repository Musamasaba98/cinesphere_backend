import multer from 'multer'
import cloudinary from './cloudinary.config.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "cinesphere/profileImages",
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        public_id: (req, file) => file.originalname,
    }
})
const upload = multer({ storage })

export default upload