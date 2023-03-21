import _ from "lodash"
import Schemas from "../utils/schema.js"
import customError from "../utils/customError.js"


const validation = (useJoiError = false) => {
    //useJoiError determines if we should respond with the base Joi error
    const _useJoiError = _.isBoolean(useJoiError) && useJoiError;
    //enabled HTTP methods for request data validation
    const _supportMethods = ["post", "put", "delete"]
    //Joi validation options
    const _validationOptions = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }
    //return the validation middleware
    return (req, res, next) => {
        //get the route path
        const route = req.originalUrl
        //get the route method and convert it to lowerCase
        const method = req.method.toLowerCase()
        //check if the method is support and route has a schema
        if (_.includes(_supportMethods, method) && _.has(Schemas, route)) {
            console.log(route)
            //get schema for the current route
            const _schema = _.get(Schemas, route)
            if (_schema) {
                const { error } = _schema.validate(req.body, _validationOptions)
                if (error) {
                    //Joi Error generator
                    // console.log(error)
                    const JoiError = {
                        status: "failed",
                        error: {
                            original: error._original,
                            //loop through all errors fetching error messages
                            details: _.map(error.details, ({ message, type }) => ({
                                message: message.replace(/['"]/g, ''),
                                type
                            }))
                        }
                    }
                    //send back the JSON Error response
                    res.status(422).json(_useJoiError ? JoiError : new customError("Invalid request data.Please review request and try again", 422))
                } else {
                    next()
                }

            }
        }
    }
}

export default validation
