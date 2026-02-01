export default function handleError(err, req, res, next) {
  res.status(500);

  const environment = process.env.ENVIRONMENT;

  return res.json({
    error: environment === "development" ? err.toString() : "Errore interno",
    message: "Qualcosa non ha funzionato",
  });
}
