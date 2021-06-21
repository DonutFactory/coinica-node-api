const Joi = require("joi");

const txSchema = Joi.object({
  account_id: Joi.string().required(),
  tx_type: Joi.string().required(),
  tx_hash: Joi.string().required(),
  currency: Joi.string().required(),
});

exports.txHash = (req, res, next) => {
  const { error } = txSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: true,
      message: error,
    });
  }
  next();
};
