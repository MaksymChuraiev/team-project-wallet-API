const { Transaction } = require("../../models");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await Transaction.findByIdAndRemove(id, { owner: _id });

  const { date, transactionType, amount } = result;

  const nextTransactions = await Transaction.find({
    owner: _id,
    date: { $gte: date },
  }).sort({
    date: -1,
  });

  for (let i = 0; i < nextTransactions.length; i += 1) {
    await Transaction.findByIdAndUpdate(nextTransactions[i]._id, {
      balance: transactionType
        ? nextTransactions[i].balance - amount
        : nextTransactions[i].balance + amount,
    });
  }

  if (!result) {
    throw new NotFound("Not found");
  }

  res.json({
    status: "success",
    code: 200,
    message: "Transaction deleted",
    data: {
      result,
    },
  });
};

module.exports = remove;
