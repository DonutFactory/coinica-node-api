const chalk = require('chalk');
const { post } = require('../../../helpers/fetch');
const { ORDER } = require('../../../helpers/multiCurrencyApi');
const responseHandler = require("../../../helpers/responseFormatter");
const validateOrder = require("../../../helpers/validateOrder");

module.exports = async(req, res) => {
  const userIP = req.header('x-forwarded-for') || req.connection.remoteAddress;
  const { transaction } = req.body
  const bodyObject = transaction || {}
  const { value, error } = validateOrder(bodyObject)

  if (error) {
    res.status(400)
    res.send({ error: true, ...error })
  } else {
    try {
      const response = await post(ORDER(), value, userIP)
      const data = await response.json()
      res.send(responseHandler(data))
    } catch (error) {
      res.status(400)
      res.send({ error: true, message: error.message || error.code || 'Internal server error' })
      console.log(chalk.red('MAKE ORDER ERROR: ', error ))
    }
  }
}
