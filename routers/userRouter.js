const express = require("express");
const { createUser, userLogin } = require("../controller/userController");

// init router
const userRoute = express.Router();

// routes
userRoute.post("/create-user", createUser);
userRoute.post("/user-login", userLogin)

// module exports
module.exports = userRoute