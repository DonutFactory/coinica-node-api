const Joi = require("Joi");

const depositSchema = Joi.object({
  account_id: Joi.string().required(),
  tx_hash: Joi.string().required(),
  issuer: Joi.string().required(),
  receiver: Joi.string().required(),
  currency: Joi.string().required(),
  amount: Joi.number().required(),
});

exports.deposit = (req, res, next) => {
  const { error } = depositSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: true,
      message: error,
    });
  }
  next();
};
