const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    categories: {
      income: {
        type: Array,
        default: ["regular income", "irregular income"],
      },
      expense: {
        type: Array,
        default: [
          "basic expenses",
          "food",
          "car",
          "personal growth",
          "self care",
          "child care",
          "household products",
          "education",
          "leisure",
          "other expenses",
        ],
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return this;
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.setBalance = function (balance) {
  this.balance = balance;
  return this;
};

const signupJoiSchema = Joi.object({
  name: Joi.string().min(1).max(12).required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
});
const signinJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).max(12).required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  signupJoiSchema,
  signinJoiSchema,
};
