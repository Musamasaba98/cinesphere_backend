import _ from "lodash"
import Schemas from "../utils/schema.js"
import customError from "../utils/customError.js"


const validation = (useJoiError = false) => {

    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;

    const _supportMethods = ["post", "put", "delete"]

    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }

    return (req, res, next) => {

        const route = req.originalUrl

        const method = req.method.toLowerCase()

        if (_.includes(_supportMethods, method) && _.has(Schemas, route)) {
            console.log(route)

            const _schema = _.get(Schemas, route)
            if (_schema) {
                const { error } = _schema.validate(req.body, _validationOptions)
                if (error) {

                    const JoiError = {
                        status: "failed",
                        error: {
                            original: error._original,

                            details: _.map(error.details, ({ message, type }) => ({
                                message: message.replace(/['"]/g, ''),
                                type
                            }))
                        }
                    }

                    res.status(422).json(_useJoiError ? JoiError : new customError("Invalid request data.Please review request and try again", 422))
                } else {
                    next()
                }

            }
        }
    }
}

export default validation
