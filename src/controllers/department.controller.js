import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createDepartment = createOne("department")

export const deleteDepartment = deleteOne("department")

export const getAllDepartments = getAll("department")

export const getDepartment = getOne("department")

export const updateDepartment = updateOne("department")