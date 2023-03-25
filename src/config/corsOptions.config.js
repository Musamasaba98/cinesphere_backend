import customError from "../utils/customError.js"
import { allowedOrigins } from "./allowedOrigins.config.js"


export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new customError('Not allowed by CORS', 403))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}
