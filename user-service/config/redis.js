const Redis = require("ioredis");
const logger = require("../utils/logger.utils");
const { REDIS_URL } = require("./config");

class RedisClient {
  static instance;
  static isConnected = false;

  constructor() {
    // Prevent direct instantiation
  }

  static getInstance() {
    if (!RedisClient.instance) {
      RedisClient.instance = new Redis(REDIS_URL, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2000);
          return delay;
        },
        maxRetriesPerRequest: 3,
      });
      RedisClient.setUpEventListeners();
    }
    return RedisClient.instance;
  }

  static setUpEventListeners() {
    const client = RedisClient.instance;
    client.on("connect", () => {
      RedisClient.isConnected = true;
      logger.info("Connected to Redis server");
    });

    client.on("ready", () => {
      logger.warn("Redis client is ready to use");
    });

    client.on("reconnecting", () => {
      logger.warn("Reconnecting to Redis server...");
    });

    client.on("error", (error) => {
      RedisClient.isConnected = false;
      logger.error(`Redis error: ${error.message}`);
    });

    client.on("end", () => {
      RedisClient.isConnected = false;
      logger.warn("Redis connection closed");
    });
  }

  static async ping() {
    const client = RedisClient.getInstance();
    return client.ping();
  }
}

module.exports = RedisClient;
