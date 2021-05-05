const Joi = require('joi');

const schema = Joi.object({
  depositCoin: Joi.string().required(),
  destinationCoin: Joi.string().required(),
  depositCoinAmount: Joi.number().required(),
  offerReferenceId: Joi.string().required(),
  userReferenceId: Joi.string().required(),
  destinationAddress: Joi.object({
    address: Joi.string().required(),
    tag: Joi.string().empty('')
  }).required(),
  refundAddress: Joi.object({
    address: Joi.string().required(),
    tag: Joi.string().empty('')
  }).required(),
})

module.exports = (obj) => {
  try {
    return schema.validate(obj);
  } catch (err) {
    return {
      status: 400,
      error: err
    }
  }
}
