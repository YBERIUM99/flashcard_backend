const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const { signUpHandler, login } = require("../controllers/authController");

// SIGNUP
authRouter.post("/signup", signUpHandler);

// LOGIN
authRouter.post("/login", login);

module.exports = authRouter;
