import express from "express"
import moviesRouter from "./routers/moviesRouter.js"
import handleError from "./middleWares/handleError.js";
import routeNotFound from "./middleWares/routeNotFound.js";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use("/api/movies", moviesRouter);

app.use(handleError);

app.use(routeNotFound);

app.listen(port, () => {
    console.log("Server is running on port " + port)
})