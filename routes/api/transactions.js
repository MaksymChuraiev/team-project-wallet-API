const express = require("express");
const controllers = require("../../controllers/transactions");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schema } = require("../../models/transaction");

const router = express.Router();

router.get("/", ctrlWrapper(controllers.getAll));
router.post(
  "/",
  validation(schema.joiCreateSchema),
  ctrlWrapper(controllers.create)
);
router.delete("/:id", isValidId, ctrlWrapper(controllers.remove));

module.exports = router;
