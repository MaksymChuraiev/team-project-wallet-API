const moment = require("moment");
const { Transaction } = require("../../models");

const getByDate = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.query;

  const startDate = moment.utc([year, month]).toDate();
  const endDate = moment(startDate).endOf("month").toDate();

  const aggregateTransactions = async (transactionType) => {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          transactionType,
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { category: "$category" },
          sum: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          sum: "$sum",
        },
      },
    ]);

    const totalSum = transactions
      .reduce((total, cat) => {
        cat.sum = Number(cat.sum).toFixed(2);

        return total + Number(cat.sum);
      }, 0)
      .toFixed(2);

    return [transactions, totalSum];
  };

  const [income, totalIncome] = await aggregateTransactions(true);
  const [expense, totalExpenses] = await aggregateTransactions(false);

  res.json({
    income,
    expense,
    totalIncome,
    totalExpenses,
  });
};

module.exports = getByDate;
