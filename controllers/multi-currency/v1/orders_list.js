const chalk = require('chalk');
const { get } = require('../../../helpers/fetch');
const { ORDERS_LIST } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");

module.exports = async(req, res) => {
  const { start, count, userRefId } = req.body
  try {
    const response = await get(ORDERS_LIST(start, count, userRefId))
    const data = await response.json()
    res.send(responseHandler(data))
  } catch (error) {
    res.status(400)
    res.send({ error: true, message: error.code || 'Internal server error' })
    console.log(chalk.red('GET ORDERS LIST ERROR: ', error ))
  }
}
