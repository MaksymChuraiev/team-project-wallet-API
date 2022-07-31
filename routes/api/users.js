const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const getCurrent = require("../../controllers/users/getCurrent");
const addCategory = require("../../controllers/users/addCategory");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

router.post("/category", auth, ctrlWrapper(addCategory));

module.exports = router;
