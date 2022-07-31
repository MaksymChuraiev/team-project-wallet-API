const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const getCurrent = require("../../controllers/users/getCurrent");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

module.exports = router;
