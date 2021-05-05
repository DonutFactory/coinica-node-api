const chalk = require('chalk');
const { get } = require('../../../helpers/fetch');
const { SUPPORTED_DEPOSIT_COINS } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");

module.exports = async(req, res) => {
  const userIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const { coin_symbol } = req.body
  if (!coin_symbol) {
    res.status(400)
    res.send({
      error: true,
      message: 'Parameters required: coin_symbol'
    })
  } else {
    try {
      const response = await get(SUPPORTED_DEPOSIT_COINS(coin_symbol), {}, userIP)
      const data = await response.json()
      res.send(responseHandler(data))
    } catch (error) {
      res.status(400)
      res.send({ error: true, message: error.code || 'Internal server error' })
      console.log(chalk.red('GET SUPPORTED DEPOSIT COINS ERROR: ', error ))
    }
  }
}
