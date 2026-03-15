const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  ENVIRONMENT: process.env.NODE_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || "http://localhost:3001",
  REDIS_URL:
    process.env.REDIS_URL ||
    `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`,
  OTP_TTL: parseInt(process.env.OTP_TTL) || 300,
  OTP_RATE_MAX_PER_HOUR: parseInt(process.env.OTP_RATE_MAX_PER_HOUR) || 5,
  HMAC_SECRET: process.env.HMAC_SECRET,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PORT: parseInt(process.env.SMTP_PORT) || 587,
  SMTP_PASS: process.env.SMTP_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM,
};
