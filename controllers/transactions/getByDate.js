const moment = require("moment");
const { Transaction } = require("../../models");

const getByDate = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.query;

  let startDate = 0;
  let endDate = 0;

  if (!month && year) {
    startDate = moment(year).utc().toDate();
    endDate = moment(startDate).endOf("year").toDate();
  }

  if (month && !year) {
    const format = "YYYY";
    const currentYear = moment().format(format);

    startDate = moment.utc([currentYear, month]).toDate();
    endDate = moment(startDate).endOf("month").toDate();
  }

  if (month && year) {
    startDate = moment.utc([year, month]).toDate();
    endDate = moment(startDate).endOf("month").toDate();
  }

  if (!month && !year) {
    startDate = moment.utc(["1900"]).toDate();
    endDate = moment().toDate();
  }

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
