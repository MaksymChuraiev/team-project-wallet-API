const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
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
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const signupJoiSchema = Joi.object({
  name: Joi.string().min(2).max(12).required(),
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
