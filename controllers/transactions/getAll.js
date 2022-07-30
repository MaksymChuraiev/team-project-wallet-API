const { Transaction } = require("../../models");
const getAll = async (req, res) => {
  const result = await Transaction.find({});

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
