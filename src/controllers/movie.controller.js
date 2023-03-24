import cloudinary from "../config/cloudinary.config.js";
import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";

//Add a movie
export const addMovie = tryToCatch(async (req, res) => {
    const { email } = req.user
    const uploadedFiles = [];
    for (const fieldname in req.files) {
        const file = req.files[fieldname][0];
        const result = await cloudinary.uploader.upload(file.path);
        uploadedFiles.push(result);
    }
    // const videoResult = await cloudinary.uploader.upload_large(req.file, {
    //     resource_type: 'video',
    //     chunk_size: 6000000,
    // }) console.log(uploadedFiles[0].public_id)
    const { title, description, Genre, price
        , budget, revenue, releaseStatus, voteCount, voteAverage, release_date, Language, productionCompanies } = req.body
    let moviCompanies = productionCompanies.split(' ')
    const companies = await prisma.productionCompany.findMany({
        where: {
            name: {
                in: moviCompanies
            }
        }
    });

    const movie = await prisma.movie.create({
        data: {
            title,
            description,
            price: Number(price),
            coverUrl: uploadedFiles[0].secure_url,
            cloudinary_coverUrl_public_id: uploadedFiles[0].public_id,
            imageUrl: uploadedFiles[1].secure_url,
            cloudinary_imageUrl_public_id: uploadedFiles[1].public_id,
            // videoUrl: videoResult.secure_url,
            // cloudinary_videoUrl_public_id: videoResult.public_id,
            // trailerUrl: videoResult.secure_url,
            // cloudinary_trailerUrl_public_id: videoResult.public_id,
            budget: BigInt(budget),
            revenue: BigInt(revenue),
            voteCount: Number(voteCount),
            releaseStatus: releaseStatus === 'false' ? false : true,
            voteAverage: parseFloat(voteAverage),
            release_date: new Date(release_date),
            Language: {
                connect: {
                    name: Language
                }
            },
            productionCompanies: {
                create: companies.map(company => ({
                    productionCompany: { connect: { id: company.id } }
                }))
            },
            createdBy: {
                connect: {
                    email: email
                }
            },
            Genre: {
                connect: { name: Genre }
            }
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