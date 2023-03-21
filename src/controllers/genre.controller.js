import prisma from "../config/prisma.config.js";
import tryToCatch from "../utils/tryToCatch.js";
import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";

//Add a post
export const addGenre = tryToCatch(async (req, res) => {

    const { name } = req.body
    const genre = await prisma.genre.create({
        data: {
            name
        }

    })
    res.status(201).json({ status: "success", data: genre })

})

//Get all Posts
export const getAllGenries = getAll("genre")

//Get a post
export const getGenre = getOne("genre")

//Update a post
export const updateGenre = updateOne("genre")

//Delete a post
export const deleteGenre = deleteOne("genre")