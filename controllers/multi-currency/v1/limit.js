const chalk = require('chalk');
const { post } = require('../../../helpers/fetch');
const { LIMIT } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");

module.exports = async(req, res) => {
  const userIP = req.connection.remoteAddress;
  const { depositCoin, destinationCoin } = req.body
  if (!depositCoin || !destinationCoin) {
    res.status(400)
    res.send({
      error: true,
      message: 'Parameters required: depositCoin, destinationCoin'
    })
  } else {
    try {
      const response = await post(LIMIT(), { depositCoin, destinationCoin }, userIP)
      const data = await response.json()
      res.send(responseHandler(data))
    } catch (error) {
      res.status(400)
      res.send({ error: true, message: error.code || 'Internal server error' })
      console.log(chalk.red('GET SUPPORTED PAIRS ERROR: ', error ))
    }
  }
}
