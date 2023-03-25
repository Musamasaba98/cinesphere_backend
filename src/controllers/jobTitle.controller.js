import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createJobTitle = createOne("jobTitle")

export const deleteJobTitle = deleteOne("jobTitle")

export const getAllJobTitles = getAll("jobTitle")

export const getJobTitle = getOne("jobTitle")

export const updateJobTitle = updateOne("jobTitle")