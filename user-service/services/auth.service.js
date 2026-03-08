const AuthRepository = require("../respositories/auth.repository");
const db = require("../models");
const { ConflictError } = require("../utils/error.utils");
const bcrypt = require("bcrypt");
const { sendOtpOnEmail } = require("../utils/email.utils");

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository(db.User);
  }

  async sendOTP(signUpData) {
    const { email, firstName, lastName, password } = signUpData;

    const user = await this.authRepository.findOne({
      where: { email },
    });
    if (user) throw new ConflictError("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const meta = { email, firstName, lastName, password: hashedPassword };

    const { otp, otpSessionId } = generateAndSendOtp(meta);

    await sendOtpOnEmail(email, otp);

    return { otpSessionId };
  }
}

module.exports = AuthService;
