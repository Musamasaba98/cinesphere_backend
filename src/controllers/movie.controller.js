import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";

//Add a movie
export const addMovie = tryToCatch(async (req, res) => {
    const { email } = req.user
    const { title, description, Genre, price
        , coverUrl, imageUrl, videoUrl, budget, revenue, releaseStatus, voteCount, voteAverage, release_date, Language, productionCompanies } = req.body

    const movie = await prisma.movie.create({
        data: {
            title,
            description,
            price,
            coverUrl,
            imageUrl,
            videoUrl,
            budget: BigInt(budget),
            revenue: BigInt(revenue),
            voteCount,
            releaseStatus,
            voteAverage,
            release_date: new Date(release_date),
            Language: {
                connect: {
                    name: Language
                }
            },
            productionCompanies: {
                connect: productionCompanies.map(name => ({ name }))
            },
            createdBy: {
                connect: {
                    email: email
                }
            },
            Genre: {
                connect: { name: Genre }
            }
        },
        include: {
            productionCompanies: true
        }
    })

    res.status(201).send({
        status: "success", data: JSON.parse(JSON.stringify(
            movie,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    })

})

//Get all movies
export const getAllMovies = getAll("movie")

//Get a movie
export const getMovie = getOne("movie")

//Update a movie
export const updateMovie = updateOne("movie")

//Delete a movie
export const deleteMovie = deleteOne("movie")