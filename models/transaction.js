const { Schema, model } = require("mongoose");
const Joi = require("joi");

const transactionSchema = Schema(
  {
    date: {
      type: Date,
      required: [true, "Set date of transaction"],
    },
    transactionType: {
      type: Boolean,
      required: [true, "Set type"],
    },
    category: {
      type: String,
      required: [true, "Set a category"],
    },
    comment: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: [true, "Amount should be at lest 0.01"],
      min: 0.01,
    },
    balance: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiCreateSchema = Joi.object({
  date: Joi.date().required(),
  transactionType: Joi.boolean(),
  category: Joi.string(),
  comment: Joi.string().min(0).max(40),
  amount: Joi.number().min(0.01).required(),
});

const schema = {
  joiCreateSchema,
};

const Transaction = model("transaction", transactionSchema);

module.exports = {
  Transaction,
  schema,
};
