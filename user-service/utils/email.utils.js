const { EMAIL_FROM } = require("../config/appconfig");
const EmailClient = require("../config/emailClient");

async function send(to, subject, html) {
  const transporter = EmailClient.getInstance();

  return transporter.sendMail({
    from: EMAIL_FROM,
    to: to,
    subject,
    html,
  });
}

async function sendOtpOnEmail(email, otp) {
  try {
    const subject = "Your OTP for IRCTC Account Verification";

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f6f8;">
        <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
          
          <h2 style="color:#2c3e50; text-align:center;">
            IRCTC Clone Verification
          </h2>

          <p style="font-size:16px;">
            Hello,
          </p>

          <p style="font-size:16px;">
            Your One-Time Password (OTP) for verifying your account is:
          </p>

          <div style="text-align:center; margin:30px 0;">
            <span style="
              font-size:28px;
              letter-spacing:6px;
              font-weight:bold;
              color:#1a73e8;
              background:#f1f3f4;
              padding:12px 24px;
              border-radius:6px;
              display:inline-block;
            ">
              ${otp}
            </span>
          </div>

          <p style="font-size:14px; color:#555;">
            This OTP is valid for <b>10 minutes</b>. Please do not share this code with anyone.
          </p>

          <hr style="margin:30px 0;"/>

          <p style="font-size:12px; color:#999; text-align:center;">
            If you did not request this email, please ignore it.
          </p>

        </div>
      </div>
    `;
    return send(email, subject, html);
  } catch (error) {
    throw error;
  }
}

function sendWelcomeEmail(email, name) {
  const subject = "Welcome to IRCTC Clone";

  const html = `
    <h2>Welcome ${name} 🎉</h2>
    <p>Your account has been successfully created.</p>
    <p>You can now start booking trains.</p>
  `;

  return send(email, subject, html);
}

module.exports = {
  sendOtpOnEmail,
  sendWelcomeEmail,
};
