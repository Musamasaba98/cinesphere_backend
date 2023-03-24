import multer from 'multer'
import cloudinary from './cloudinary.config.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "cinesphere/profileImages",
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        public_id: (req, file) => file.originalname,
    }
})
const videoStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "cinesphere/movies/fullVideo",
        public_id: (req, file) => file.originalname
    }
})
export const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 100000000 } })
export const uploadVideo = multer({ storage: videoStorage, limits: { fileSize: 150000000 } })
