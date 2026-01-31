import express from "express"
import moviesRouter from "./routers/moviesRouter.js"

const app = express();
const port = 3000;

app.use("/api/movies", moviesRouter)

app.listen(port, () => {
    console.log("Server is running on port " + port)
})