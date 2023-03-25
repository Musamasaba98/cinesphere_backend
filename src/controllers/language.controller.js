import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createLanguage = createOne("language")

export const deleteLanguage = deleteOne("language")

export const getAllLanguages = getAll("language")

export const getLanguage = getOne("language")

export const updateLanguage = updateOne("language")