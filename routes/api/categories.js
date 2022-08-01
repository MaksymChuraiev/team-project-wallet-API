const express = require("express");
const { ctrlWrapper, auth } = require("../../middlewares");
const getCategories = require("../../controllers/categories/getCategories");
const addCategory = require("../../controllers/categories/addCategory");

const router = express.Router();

router.post("/categories", auth, ctrlWrapper(addCategory));
router.get("/", ctrlWrapper(getCategories));

module.exports = router;
