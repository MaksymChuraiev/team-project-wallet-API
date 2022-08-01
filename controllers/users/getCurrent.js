const getCurrent = async (req, res) => {
  const { name, email, token, balance, categories } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: { name, email, token, balance, categories },
    },
  });
};

module.exports = getCurrent;
