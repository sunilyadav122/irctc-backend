const logger = require("../utils/logger.utils");

const reqLogger = (req, res, next) => {
  const start = Date.now();

  logger.debug(
    `Incoming Request -> [${req.method}] ${req.originalUrl} | IP: ${req.ip}`,
  );

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info(
      `[${req.method}] ${req.originalUrl} | Status: ${res.statusCode} | ${duration} ms | IP: ${req.ip}`,
    );
  });

  next();
};

module.exports = reqLogger;
