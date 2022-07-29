const express = require("express");
const { transactions: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);
router.delete("/:id", ctrl.remove)

module.exports = router;
