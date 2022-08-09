const { Transaction } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;

  const data = await Transaction.find({ owner: _id })
    .populate("owner", "_id name email")
    .sort({
      date: 1,
    });

  const result = [...data].reverse();

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getAll;
