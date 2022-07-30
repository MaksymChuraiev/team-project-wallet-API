const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized(`Email or password is wrong`);
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "Success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    },
  });
};

module.exports = signin;
