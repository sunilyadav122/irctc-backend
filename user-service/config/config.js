const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  ENVIRONMENT: process.env.NODE_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "http://localhost:3001",
  REDIS_URL:
    "redis://" + process.env.REDIS_HOST ||
    "localhost" + ":" + process.env.REDIS_PORT ||
    "6379",
};
