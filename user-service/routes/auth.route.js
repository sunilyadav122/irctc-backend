const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

const AuthController = new AuthController();

router.post("/send-otp", AuthController.sendOTP);

module.exports = router;
