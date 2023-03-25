import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createMovieCast = createOne("movieCast")

export const deleteMovieCast = deleteOne("movieCast")

export const getAllMovieCasts = getAll("movieCast")

export const getMovieCast = getOne("movieCast")

export const updateMovieCast = updateOne("movieCast")