const { Transaction } = require("../../models");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndRemove(id);

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
