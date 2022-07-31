const { Transaction } = require("../../models");
// const { BadRequest } = require('http-errors');

const create = async (req, res) => {
  const { _id } = req.user;
  const { date, transactionType, amount } = req.body;

  const previousTransactions = await Transaction.find({
    owner: _id,
    date: { $lt: date },
  }).sort({
    date: -1,
    createdAt: -1,
  });

  let prevBalance = 0;

  if (previousTransactions.length > 0) {
    prevBalance = previousTransactions[0].balance;
  }

  console.log("PREV", previousTransactions);

  const nextTransactions = await Transaction.find({
    owner: _id,
    date: { $gte: date },
  }).sort({
    date: -1,
    createdAt: -1,
  });

  for (let i = 0; i < nextTransactions.length; i += 1) {
    await Transaction.findByIdAndUpdate(nextTransactions[i]._id, {
      balance: transactionType
        ? nextTransactions[i].balance + amount
        : nextTransactions[i].balance - amount,
    });
  }

  const newTransaction = await Transaction.create({
    ...req.body,
    balance: transactionType ? prevBalance + amount : prevBalance - amount,
    owner: _id,
  });
  console.log("NEW", newTransaction);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "Transaction created",
    data: { newTransaction },
  });
};

module.exports = create;
