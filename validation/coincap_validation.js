const Joi = require("joi");

const assetsSchema = Joi.object({
  currencies: Joi.array(),
});

exports.assets = (req, res, next) => {
  const { error } = assetsSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: true,
      message: error,
    });
  }
  next();
};
