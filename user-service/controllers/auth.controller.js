const { ENVIRONMENT, OTP_TTL } = require("../config/appconfig");
const AuthService = require("../services/auth.service");
const asyncHandler = require("../utils/asyn-handler.utils");
const { BadRequestError } = require("../utils/error.utils");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  sendOTP = asyncHandler(async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName)
      throw new BadRequestError("All fields are required");

    const { otpSessionId } = await this.authService.sendOTP({
      email,
      firstName,
      lastName,
      password,
    });

    return res
      .status(200)
      .cookie("otp_session", otpSessionId, {
        httpOnly: true,
        secure: ENVIRONMENT === "production",
        sameSite: "strict",
        maxAge: OTP_TTL * 1000,
      })
      .json({
        success: true,
        message: "OTP sent successfully",
      });
  });
}

module.exports = AuthController;
