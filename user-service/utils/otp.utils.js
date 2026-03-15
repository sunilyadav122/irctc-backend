const {
  OTP_RATE_MAX_PER_HOUR,
  HMAC_SECRET,
  OTP_TTL,
} = require("../config/appconfig");
const RedisClient = require("../config/redis");
const { TooManyRequestsError } = require("./error.utils");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");

async function generateAndStoreOtp(meta) {
  const redis = RedisClient.getInstance();

  // Validate otp request rate
  const rateKey = `otp:rate:${meta.email}`;
  const sentOtpCount = parseInt((await redis.get(rateKey)) || "0", 10);
  if (sentOtpCount >= OTP_RATE_MAX_PER_HOUR) {
    throw new TooManyRequestsError(
      "Too many OTP requests. Please try again later.",
      "OTP_RATE_LIMIT_EXCEEDED",
    );
  }

  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const otpSessionId = crypto.randomUUID();
  const hash = hmacFor(meta.email, otp);

  await redis.set(
    `otp:session:${otpSessionId}`,
    JSON.stringify({
      hashedOtp: hash,
      meta,
    }),
    "EX",
    OTP_TTL,
  );

  await redis.incr(rateKey);
  await redis.expire(rateKey, 3600); // Reset count after 1 hour

  return { otp, otpSessionId };
}

function hmacFor(email, otp) {
  return crypto
    .createHmac("sha256", HMAC_SECRET)
    .update(`${email}:${otp}`)
    .digest("hex");
}

module.exports = { generateAndStoreOtp };
