const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const extraDetails = err.extraDetails || "Something went wrong";

  return res.status(statusCode).json({ message, extraDetails });
};

module.exports = errorMiddleware;
