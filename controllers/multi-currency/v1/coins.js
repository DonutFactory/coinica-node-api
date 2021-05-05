const chalk = require('chalk');
const { get } = require('../../../helpers/fetch');
const { COINS } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");

module.exports = async(req, res) => {
  const userIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
  try {
    const response = await get(COINS(), {}, userIP)
    const data = await response.json()
    res.send(responseHandler(data))
  } catch (error) {
    res.status(400)
    res.send({ error: true, message: 'Internal server error' })
    console.log(chalk.red('GET COINS ERROR: ', error ))
  }
}
