const express = require("express");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrl.signup);
router.post("/signin", ctrl.signin);
router.get("/logout", ctrl.logout);
