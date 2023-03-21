import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: diweh6rab,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true,
    shorten: true,
    ssl_detected: true
})

export default cloudinary;