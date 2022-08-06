const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const getCategories = require("../../controllers/categories/getCategories");

const router = express.Router();

router.get("/", ctrlWrapper(getCategories));

module.exports = router;
