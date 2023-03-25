import { deleteOne, getAll, getOne, updateOne, createOne } from "./factory.controller.js";


export const createPerson = createOne("person")

export const deletePerson = deleteOne("person")

export const getAllPersons = getAll("person")

export const getPerson = getOne("person")

export const updatePerson = updateOne("person")