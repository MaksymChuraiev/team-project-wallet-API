const { Transaction } = require("../../models");

const create = async (req, res) => {
  const { _id } = req.user;
  const newTransaction = await Transaction.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Transaction created",
    data: { newTransaction },
  });
};

module.exports = create;
