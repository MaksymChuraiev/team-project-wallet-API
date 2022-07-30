// const express = require("express");
// const { transactions: ctrl } = require("../../controllers/transactions");
// const { validation, ctrlWrapper } = require("../../middlewares");
// const { joiCreateSchema } = require("../../models");

// const router = express.Router();

// router.get(
//   "/",
//   ctrlWrapper((req, res) => {
//     res.send("all transactions");
//   })
// );
// router.post("/", validation(joiCreateSchema), ctrlWrapper(ctrl.create));
// router.delete("/:id", ctrlWrapper(ctrl.remove));

// module.exports = router;
