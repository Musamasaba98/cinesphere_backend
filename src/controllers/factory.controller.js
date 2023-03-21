import prisma from "../config/prisma.config.js";
import customError from "../utils/customError.js";
import { toSentenceCase } from "../utils/toSentenceCase.js";
import tryToCatch from "../utils/tryToCatch.js";

export const deleteOne = Model => tryToCatch(async (req, res, next) => {
    const id = req.params.id
    const deleted = await prisma[Model].delete({
        where: {
            id: id
        }
    })
    if (!deleted) {
        return next(new customError(`There is no ${Model} with that ID ${id}`, 404))
    }
    res.status(204).json({ status: "success", message: `${toSentenceCase(Model)} has successfully been deleted` })
})

export const updateOne = Modal => tryToCatch(async (req, res, next) => {
    const updated = await prisma[category].update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    if (!updated) {
        return next(new customError(`There is no ${Modal} with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: updated })

})

export const getOne = (Modal) => tryToCatch(async (req, res, next) => {

    const item = await prisma[Modal].findUnique({
        where: {
            id: req.params.id
        }
    })
    if (!item) {
        return next(new customError(`There is no ${Modal} with that ID ${req.params.id}`, 404))
    }
    res.status(200).json({ status: "success", data: item })


})
export const getAll = (Modal) => tryToCatch(async (req, res) => {

    const items = await prisma[Modal].findMany()
    res.status(200).json({ status: "success", results: items.length, data: items })

})