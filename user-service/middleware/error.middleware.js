const logger = require("../utils/logger.utils");

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const code = err.code || "INTERNAL_SERVER_ERROR";

  logger.error({
    message,
    code,
    statusCode,
    method: req.method,
    path: req.originalUrl,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
    error: code,
  });
};

module.exports = errorHandler;
