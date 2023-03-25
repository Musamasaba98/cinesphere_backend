import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createKeyword = createOne("keyword")

export const deleteKeyword = deleteOne("keyword")

export const getAllKeywords = getAll("keyword")

export const getKeyword = getOne("keyword")

export const updateKeyword = updateOne("keyword")