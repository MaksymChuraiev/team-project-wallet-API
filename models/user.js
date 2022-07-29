const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
    balance: {
      type: Number,
      default: 0,
    },
    totalTransactions: {
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
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const signupJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).max(12).required(),
});
const signinJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
const nameJoiSchema = Joi.object({
  name: Joi.string().trim().min(2).max(12).required(),
});
const emailJoiSchema = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  signupJoiSchema,
  signinJoiSchema,
  nameJoiSchema,
  emailJoiSchema,
};
