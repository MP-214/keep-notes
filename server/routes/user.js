const express = require("express");

const router = express.Router();
const { handleLogin, handleSignUp } = require("../controller/user");

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);

module.exports = router;
