var Joi = require("joi");

var tx = Joi.object({
  username: Joi.string().required(),
  txhash: Joi.string().required(),
});

exports.txHash = (req, res, next) => {
  const { error } = tx.validate(req.body);

  if (error) {
    return res.status(400).json({
      error: true,
      message: error,
    });
  }
  next();
};
