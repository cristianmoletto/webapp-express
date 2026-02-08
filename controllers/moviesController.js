import connection from "../database/dbConnection.js";
import { DateTime } from "luxon";


// INDEX
function index(req, res, next) {

  const {search} = req.query;
  let params = [];

  let query = `
    SELECT movies.*, 
    CAST(AVG(reviews.vote) AS FLOAT) AS avg_vote
    FROM movies
    LEFT JOIN reviews
    ON movies.id = reviews.movie_id `;

  if (search !== undefined) {
    query += `WHERE movies.title LIKE ?`;
    params.push(`%${search}%`)
  }

  query += `GROUP BY movies.id`;   

  connection.query(query, params, (err, results) => {
    if (err) return next(err);

    const movies = results.map((movie) => {
      const data = movie.created_at;
      const dt = DateTime.fromObject(data);

      return {
        ...movie,
        image: `${process.env.SERVER_URL}/images/${movie.image}`,
        created_at: dt.toLocaleString(),
        updated_at: DateTime.fromObject(movie.updaded_at).toLocaleString(),
      };
    });

    res.json({
      results: movies,
    });
  });
}

// SHOW
function show(req, res, next) {
  const { id } = req.params;

  const movieQuery = `
    SELECT movies.*, 
    CAST(AVG(reviews.vote) AS FLOAT) AS avg_vote
    FROM movies
    LEFT JOIN reviews
    ON movies.id = reviews.movie_id
    WHERE movies.id = ?
  `;

  connection.query(movieQuery, [id], (err, results) => {
    if (err) return next(err);

    if (results.length === 0) {
      res.status(404);
      return res.json({
        error: "NOT FOUND",
        message: "Film non trovato",
      });
    }

    const movie = results[0];

    const reviewsQuery = `
      SELECT *
      FROM reviews
      WHERE movie_id = ?
    `;

    connection.query(reviewsQuery, [id], (err, reviewsResults) => {
      if (err) return next(err);

      const reviewsFomatted = reviewsResults.map((review) => {
        return {
          ...review,
          created_at: DateTime.fromObject(review.created_at).toLocaleString(),
          updated_at: DateTime.fromObject(review.updated_at).toLocaleString(),
        };
      });

      const respObj = {
        ...movie,
        image: `${process.env.SERVER_URL}/images/${movie.image}`,
        created_at: DateTime.fromObject(movie.created_at).toLocaleString(),
        updated_at: DateTime.fromObject(movie.updated_at).toLocaleString(),
        reviews: reviewsFomatted,
      };

      return res.json(respObj);
    });
  });
}



export default { index, show };
