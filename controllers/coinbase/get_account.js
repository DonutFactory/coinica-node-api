const { coinbaseClient } = require("../../services/coinbaseClient");
const successHandler = require("../../helpers/successHandler");
const errorHandler = require("../../helpers/errorHandler");
const paramValidator = require("../../helpers/paramValidator");

const get_account = async(req, res) => {
  const { id } = req.body
  const { isValid, message } = paramValidator({ id })
  if (isValid) {
    try {
      coinbaseClient.getAccount(id, function(err, account) {
        if (!err) {
          res.status(200).json(successHandler({ data: account }))
        } else {
          res.status(400).json(errorHandler({ status: 400, message: err.message || 'Error getting account' }))
        }
      });
    } catch (err) {
      res.status(500).json(errorHandler())
    }
  } else {
    res.status(400).json(errorHandler({ status: 400, message }))
  }
}

module.exports = get_account;
