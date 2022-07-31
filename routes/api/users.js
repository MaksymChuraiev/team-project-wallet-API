const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const getCurrent = require("../../controllers/users/getCurrent");
const addCategory = require("../../controllers/users/addCategory");
const getCategories = require("../../controllers/users/getCategories");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(getCurrent));

router.post("/category", auth, ctrlWrapper(addCategory));
router.get("/category", ctrlWrapper(getCategories));

module.exports = router;
