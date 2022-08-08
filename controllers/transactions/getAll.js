const { Transaction } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;

  // const { page = 1, limit = 5 } = req.query;
  // const skip = (page - 1) * limit;
  // const result = await Transaction.find({ owner: _id }, "", {
  //   skip,
  //   limit: Number(limit),
  // }).populate("owner", "_id name email");

  const result = await Transaction.find({ owner: _id })
    .populate("owner", "_id name email")
    .sort({
      date: 1,
    });

  const sortResult = [...result].reverse();

  console.log("RES", result);
  console.log("SORT", sortResult);

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      sortResult,
    },
  });
};

module.exports = getAll;
