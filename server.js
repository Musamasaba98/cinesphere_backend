import express from 'express'

const PORT = process.env.PORT || 10000,
    app = express();

app.get('/', (req, res) => {
    res.send('Hello welcome to CineSphere Backend API')
})

app.listen(PORT, () => console.log(`Server has started at port ${PORT}`))  