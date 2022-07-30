const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { signupJoiSchema, signinJoiSchema } = require("../../models");

const signup = require("../../controllers/auth/signup");
const signin = require("../../controllers/auth/signin");
const logout = require("../../controllers/auth/logout");

const router = express.Router();

router.post("/signup", validation(signupJoiSchema), ctrlWrapper(signup));
router.post("/signin", validation(signinJoiSchema), ctrlWrapper(signin));
router.get("/logout", ctrlWrapper(logout));

module.exports = router;
