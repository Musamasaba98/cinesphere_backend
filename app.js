import express from "express";
import cors from 'cors'
import userRouter from "./src/routes/user.route.js"
import movieRouter from "./src/routes/movie.route.js"
import genreRouter from "./src/routes/genre.route.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import customError from "./src/utils/customError.js";


const app = express();

app.use(cors())
app.use("/static", express.static("./src/public"));
app.use(express.json({ limit: '1gb' }));
app.use(express.urlencoded({ limit: '1gb', extended: true }));
app.use("/api/v1/user", userRouter)
app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/genre", genreRouter)
app.use(errorHandler)
app.get('/', (req, res) => {
    res.send('Hello welcome to CineSphere Backend API')
})
app.all("*", (req, res, next) => next(new customError(`Cant find ${req.originalUrl}`, 404))
);

export default app;