const AuthRepository = require("../respositories/auth.repository");
const db = require("../models");

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository(db.User);
  }

  async sendOTP(signUpData) {
    return "OTP sent successfully";
  }
}

module.exports = AuthService;
