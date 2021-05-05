const chalk = require('chalk');
const { get } = require('../../../helpers/fetch');
const { GET_ORDER } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");

module.exports = async(req, res) => {
  const userIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const { orderId } = req.body
  if (!orderId) {
    res.status(400)
    res.send({
      error: true,
      message: 'Parameters required: orderId'
    })
  } else {
    try {
      const response = await get(GET_ORDER(orderId), {}, userIP)
      const data = await response.json()
      res.send(responseHandler(data))
    } catch (error) {
      res.status(400)
      res.send({ error: true, message: error.code || 'Internal server error' })
      console.log(chalk.red('GET ORDER STATUS ERROR: ', error ))
    }
  }
}
