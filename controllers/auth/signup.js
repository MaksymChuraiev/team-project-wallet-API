const { User } = require("../../models");
const { Conflict } = require("http-errors");
// const bcrypt = require;
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email ${email} already exist`);
  }
  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = signup;
