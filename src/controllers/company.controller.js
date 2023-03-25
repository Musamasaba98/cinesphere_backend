import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createCompany = createOne("company")

export const deleteCompany = deleteOne("company")

export const getAllCompanys = getAll("company")

export const getCompany = getOne("company")

export const updateCompany = updateOne("company")