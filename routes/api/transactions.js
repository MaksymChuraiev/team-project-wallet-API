const express = require("express");
const controllers = require("../../controllers/transactions");
const {
  validation,
  ctrlWrapper,
  isValidId,
  auth,
} = require("../../middlewares");
const { schema } = require("../../models/transaction");

const router = express.Router();

router.get("/", auth, ctrlWrapper(controllers.getAll));
router.post(
  "/",
  auth,
  validation(schema.joiCreateSchema),
  ctrlWrapper(controllers.create)
);
router.delete("/:id", auth, isValidId, ctrlWrapper(controllers.remove));

router.get("/statistic", auth, ctrlWrapper(controllers.getByDate));

module.exports = router;
