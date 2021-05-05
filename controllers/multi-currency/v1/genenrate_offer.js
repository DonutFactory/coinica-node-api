const chalk = require('chalk');
const { post } = require('../../../helpers/fetch');
const { OFFER } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");

module.exports = async(req, res) => {
  const userIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const { depositCoin, destinationCoin, depositCoinAmount } = req.body
  if (!depositCoin || !destinationCoin || depositCoinAmount == null) {
    res.status(400)
    res.send({
      error: true,
      message: 'Parameters required: depositCoin, destinationCoin, depositCoinAmount'
    })
  } else {
    try {
      const response = await post(OFFER(), { depositCoin, destinationCoin, depositCoinAmount: +(depositCoinAmount) }, userIP)
      const data = await response.json()
      res.send(responseHandler(data))
    } catch (error) {
      res.status(400)
      res.send({ error: true, message: error.code || 'Internal server error' })
      console.log(chalk.red('GENERATE OFFER ERROR: ', error ))
    }
  }
}
