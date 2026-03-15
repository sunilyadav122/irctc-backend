const nodemailer = require("nodemailer");
const logger = require("../utils/logger.utils");
const config = require("./appconfig");

class EmailClient {
  static instance;
  static isReady = false;

  constructor() {}

  static getInstance() {
    if (!EmailClient.instance) {
      EmailClient.instance = nodemailer.createTransport({
        host: config.SMTP_HOST,
        port: config.SMTP_PORT,
        secure: config.ENVIRONMENT === "production",
        auth: {
          user: config.SMTP_USER,
          pass: config.SMTP_PASS,
        },
      });

      EmailClient.verifyConnection();
    }

    return EmailClient.instance;
  }

  static async verifyConnection() {
    try {
      const transporter = EmailClient.instance;
      await transporter.verify();
      EmailClient.isReady = true;
      logger.info("Email transporter is ready");
    } catch (error) {
      EmailClient.isReady = false;
      logger.error(`Email transporter error: ${error.message}`);
    }
  }
}

module.exports = EmailClient;
