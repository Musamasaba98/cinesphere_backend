import Joi from "joi";

//user schema
const user = Joi.object({
    email: Joi.string().email().lowercase().required(),
    age: Joi.number().integer().min(18),
    fullname: Joi.string().min(3).max(40).trim().required(),
    username: Joi.string().min(3).max(40).trim().required(),
    password: Joi.string().min(7).required().strict(),
    role: Joi.string().uppercase().trim(),
    gender: Joi.string().uppercase().trim(),
    image: Joi.any()
})
//login schema
const login = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required().strict()
})
//post schema
const post = Joi.object({
    averageRating: Joi.number().positive().min(0).max(5).precision(1),
    title: Joi.string().min(10).max(256).required(),
    content: Joi.string().min(10).max(256).required(),
    categories: Joi.array().items(Joi.string()).required()
})
//category schema
const category = Joi.object({
    name: Joi.string().min(10).required()
})

export default {
    '/api/v1/user/signup': user,
    '/api/v1/user/login': login,
    '/api/v1/posts': post,
    '/api/v1/category': category,
}