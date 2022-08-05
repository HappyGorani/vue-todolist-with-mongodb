function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.code === 404) {
    return res.status(404).json({
      message: "404",
    });
  }
  return res.status(500).json({
    message: "500",
  });
}
module.exports = errorHandler;
