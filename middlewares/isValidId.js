const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  const result = isValidObjectId(id);

  if (!result) {
    const error = new BadRequest("Invalid id");

    return next(error);
  }
  next();
};

module.exports = isValidId;
