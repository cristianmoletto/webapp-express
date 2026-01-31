import connection from "../database/dbConnection";

// INDEX
function index(req, res){
    const query = "SELECT * from movies"
    connection.query(query, (err, results) => {
        if (err) return console.log(err);
        res.json({results})
    })
}


// SHOW
function show(req, res){
    console.log("show")
}


export default {index, show}