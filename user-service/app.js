const express = require("express");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const errorMiddleware = require("./middleware/error.middleware");
const requestLogger = require("./middleware/logger.middleware");
const { PORT } = require("./config/config");
const corsMiddleware = require("./middleware/cors.middleware");
const logger = require("./utils/logger.utils");

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorMiddleware);

function startSever() {
  try {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
}

startSever();
