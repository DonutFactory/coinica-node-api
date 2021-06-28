const Joi = require("joi");

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

const withdrawSchema = Joi.object({
  address: Joi.string().required(),
  value: Joi.string().required(),
  gasPrice: Joi.string().required(),
  account_id: Joi.string().required(),
});

exports.withdraw = (req, res, next) => {
  const { error } = withdrawSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: true,
      message: error,
    });
  }
  next();
};
