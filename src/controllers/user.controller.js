import { deleteOne, getAll, getOne, updateOne } from "./factory.controller.js";



//Find all Users
export const findAllUsers = getAll("user")

//Find a user
export const findUser = getOne("user")

//Update a User
export const updateUser = updateOne("user")

//Delete a User
export const deleteUser = deleteOne("user")