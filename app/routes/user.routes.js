const express = require("express");
const { login, signup } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", signup);

userRouter.post("/login", login);

// userRouter.get("/profile");

module.exports = userRouter;
