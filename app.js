import express from "express";
import cors from 'cors'
import userRouter from "./src/routes/user.route.js"
import movieRouter from "./src/routes/movie.route.js"
import genreRouter from "./src/routes/genre.route.js"
import personRouter from "./src/routes/person.route.js"
import movieCastRouter from "./src/routes/movieCast.route.js"
import languageRouter from "./src/routes/language.route.js"
import keywordRouter from "./src/routes/keyword.route.js"
import jobTitleRouter from "./src/routes/jobTitle.route.js"
import departmentRouter from "./src/routes/department.route.js"
import companyRouter from "./src/routes/company.route.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import customError from "./src/utils/customError.js";
import { corsOptions } from "./src/config/corsOptions.config.js";


const app = express();

app.use(cors(corsOptions))
app.use("/static", express.static("./src/public"));
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));
app.use("/api/v1/user", userRouter)
app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/genre", genreRouter)
app.use("/api/v1/person", personRouter)
app.use("/api/v1/movieCast", movieCastRouter)
app.use("/api/v1/language", languageRouter)
app.use("/api/v1/keyword", keywordRouter)
app.use("/api/v1/jobTitle", jobTitleRouter)
app.use("/api/v1/department", departmentRouter)
app.use("/api/v1/company", companyRouter)
app.use(errorHandler)
app.get('/', (req, res) => {
    res.send('Hello welcome to CineSphere Backend API')
})
app.all("*", (req, res, next) => next(new customError(`Cant find ${req.originalUrl}`, 404))
);

export default app;