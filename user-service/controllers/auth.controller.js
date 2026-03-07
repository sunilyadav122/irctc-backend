const AuthService = require("../services/auth.service");
const asyncHandler = require("../utils/asyn-handler.utils");
const { BadRequestError } = require("../utils/error.utils");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  sendOTP = asyncHandler((req, res) => {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName)
      throw new BadRequestError("All fields are required");

    const payload = {
      email,
      firstName,
      lastName,
      password,
    };

    return this.authService.sendOTP(payload);
  });
}

module.exports = AuthController;
