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
export const createOne = Model => tryToCatch(async (req, res, next) => {
    const item = await prisma[Model].create({
        data: req.body
    })
    if (!item) {
        return next(new customError(`The ${Model} has failed to create.`))
    }
    res.status(201).send({ status: "success", data: item })
})
export const updateOne = Modal => tryToCatch(async (req, res, next) => {
    const updated = await prisma[Modal].update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    if (!updated) {
        return next(new customError(`There is no ${Modal} with that ID ${req.params.id}`, 404))
    }
    Modal !== 'movie' ? res.status(200).json({ status: "success", data: updated }) : (res.status(200).send({
        status: "success", data: JSON.parse(JSON.stringify(
            updated,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    }))

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
    Modal !== 'movie' ? res.status(200).json({ status: "success", data: item }) : (res.status(200).send({
        status: "success", data: JSON.parse(JSON.stringify(
            item,
            (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
        ))
    }))


})
export const getAll = (Modal) => tryToCatch(async (req, res) => {
    const items = await prisma[Modal].findMany()
    if (Modal === 'movie') {
        res.status(200).json({
            status: "success", results: items.length, data: JSON.parse(JSON.stringify(
                items,
                (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
            ))
        })
    } else {

        res.status(200).json({ status: "success", results: items.length, data: items })
    }

})