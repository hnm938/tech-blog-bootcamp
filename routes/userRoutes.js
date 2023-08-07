const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signup", userController.signUp);
router.get("/signup", userController.renderSignupPage);

router.post("/login", userController.logIn);
router.get("/login", userController.renderLoginPage);

router.get("/logout", userController.logOut);

module.exports = router;
