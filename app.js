import express from "express"
import connection from "./database/dbConnection.js";
import router from "./routers/moviesRouter.js"

const app = express();
const port = 3000;



app.listen(port, () => {
    console.log("Server is running on port " + port)
})