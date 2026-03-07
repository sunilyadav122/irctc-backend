const { ALLOWED_ORIGIN } = require("../config/appconfig");
const cors = require("cors");

const corsMiddleware = cors({
  origin: ALLOWED_ORIGIN.split(",").map((origin) => origin.trim()),
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Authorization",
    "Content-Type",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
});

module.exports = corsMiddleware;
