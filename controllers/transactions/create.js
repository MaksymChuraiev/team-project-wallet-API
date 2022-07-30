const { Transaction } = require("../../models");

const create = async (req, res) => {
  const newTransaction = await Transaction.create({ ...req.body });
  res.status(201).json({
    status: "success",
    code: 200,
    message: "Transaction created",
    data: { newTransaction },
  });
};

module.exports = create;
