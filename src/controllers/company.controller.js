import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createCompany = createOne("productionCompany")

export const deleteCompany = deleteOne("productionCompany")

export const getAllCompanys = getAll("productionCompany")

export const getCompany = getOne("productionCompany")

export const updateCompany = updateOne("productionCompany")