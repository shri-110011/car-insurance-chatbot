const express = require('express');
const userController = require('./user.controller');
const router = express.Router();

router.post("/login", userController.user_login);

router.post("/logout", userController.authenticate_token, userController.user_logout);

router.post("/token", userController.authenticate_token ,userController.user_token);

router.post("/register", userController.user_register);


module.exports = router;
