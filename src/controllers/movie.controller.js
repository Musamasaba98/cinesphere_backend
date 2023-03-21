import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";

//Add a movie
export const addMovie = tryToCatch(async (req, res) => {
    const { email } = req.user
    const { averageRating, title, content, genries } = req.body
    const movie = await prisma.movie.create({
        data: {
            averageRating,
            title,
            content,
            author: {
                connect: {
                    email: email
                }
            },
            genries: {
                connect: genries.map(name => ({ name }))
            }
        }
    })

    res.status(201).json({ status: "success", data: movie })
})

//Get all movies
export const getAllMovies = getAll("movie")

//Get a movie
export const getMovie = getOne("movie")

//Update a movie
export const updateMovie = updateOne("movie")

//Delete a movie
export const deleteMovie = deleteOne("movie")