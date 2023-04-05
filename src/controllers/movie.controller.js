import cloudinary from "../config/cloudinary.config.js";
import prisma from "../config/prisma.config.js";
import { searchMovieTerm } from "../utils/apiFeatures.js";
import customError from "../utils/customError.js";
import { toSentenceCase } from "../utils/toSentenceCase.js";
import tryToCatch from "../utils/tryToCatch.js";
import { getAll, getOne, updateOne } from "./factory.controller.js";

//Add a movie
export const addMovie = tryToCatch(async (req, res) => {

    const { email } = req.user
    const { title, description, Genre, price,
        Language } = req.body

    const movie = await prisma.movie.create({
        data: {
            title,
            description,
            price: Number(price),
            Language: {
                connect: {
                    name: String(Language)
                }
            },
            createdBy: {
                connect: {
                    email: email
                }
            },
            Genre: {
                genre: {
                    connect: { name: Genre }
                }
            }
        }
    })

    res.status(201).send({
        status: "success", results: JSON.parse(JSON.stringify(
            movie,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    })

})
export const updateMovieImages = tryToCatch(async (req, res, next) => {
    const uploadedFiles = [];
    for (const fieldname in req.files) {
        const file = req.files[fieldname][0];
        const result = await cloudinary.uploader.upload(file.path, { quality: 'auto' });
        uploadedFiles.push(result);
    }
    // const videoResult = await cloudinary.uploader.upload_large(req.file, {
    //     resource_type: 'video',
    //     chunk_size: 6000000,
    // }) 
    const updatedMovie = await prisma.movie.update({
        where: {
            id: req.params.id
        },
        data: {
            coverUrl: uploadedFiles[0].secure_url,
            cloudinary_coverUrl_public_id: uploadedFiles[0].public_id,
            imageUrl: uploadedFiles[1].secure_url,
            cloudinary_imageUrl_public_id: uploadedFiles[1].public_id,
            // videoUrl: videoResult.secure_url,
            // cloudinary_videoUrl_public_id: videoResult.public_id,
            // trailerUrl: videoResult.secure_url,
            // cloudinary_trailerUrl_public_id: videoResult.public_id,
        }
    })
    if (!updatedMovie) {
        return next(new customError(`There is no Movie with that ID ${req.body.id}`, 404))
    }
    res.status(201).send({
        status: "success", data: JSON.parse(JSON.stringify(
            updatedMovie,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    })
})
export const updateMovieData = tryToCatch(async (req, res, next) => {

    const { budget, revenue, releaseStatus, release_date,
        productionCompanies } = req.body

    const updatedMovie = await prisma.movie.update({
        where: {
            id: req.params.id
        },
        data: {
            budget: BigInt(budget),
            revenue: BigInt(revenue),
            releaseStatus: releaseStatus === 'false' ? false : true,
            release_date: new Date(release_date),
            productionCompanies: {
                create: productionCompanies.map(company => ({
                    productionCompany: { connect: { id: company.id } }
                }))

            }
        }
    })
    if (!updatedMovie) {
        return next(new customError(`There is no Movie with that ID ${req.body.id}`, 404))
    }
    res.status(201).send({
        status: "success", data: JSON.parse(JSON.stringify(
            updatedMovie,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    })
})
export const searchMovies = tryToCatch(async (req, res, next) => {
    const searchTerm = req.query.q;
    const movies = await searchMovieTerm(searchTerm); d

    res.status(201).send({
        status: "success", results: JSON.parse(JSON.stringify(
            movies,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    })
});

//Delete a movie
export const deleteMovie = tryToCatch(async (req, res, next) => {
    const id = req.params.id
    await prisma.movieProductionCompany.deleteMany({
        where: {
            movieId: id
        }
    });
    const movie = await prisma.movie.findUnique({
        where: {
            id: id
        }
    })
    const imagepublic_id = movie.cloudinary_imageUrl_public_id
    const coverpublic_id = movie.cloudinary_coverUrl_public_id
    await cloudinary.uploader.destroy(imagepublic_id, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(result);
        }
    });
    await cloudinary.uploader.destroy(coverpublic_id, (error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(result);
        }
    })
    const deleted = await prisma.movie.delete({
        where: {
            id: id
        }
    });
    if (!deleted) {
        return next(new customError(`There is no Movie with that ID ${id}`, 404))
    }
    res.status(200).json({ status: "success", message: `${toSentenceCase("movie")} has successfully been deleted` })
})

//Get all movies
export const getAllMovies = getAll("movie")

//Get a movie
export const getMovie = getOne("movie")

//Update a movie
export const updateMovie = updateOne("movie")
