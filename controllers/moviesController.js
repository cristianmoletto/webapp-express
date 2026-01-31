import connection from "../database/dbConnection.js";

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
    const {id} = req.params;
    const query = `
    SELECT * 
    FROM movies 
    WHERE id = ?`

    connection.query(query, [id], (err, results) => {
        if (err) return console.log(err);
        
        if (results.length === 0) {
      res.status(404);
      return res.json({
        message: "film non trovato",
      });
    }      
          res.json(results) 
});
}


export default {index, show}