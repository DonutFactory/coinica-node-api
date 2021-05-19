const { coinbaseClient } = require("../../services/coinbaseClient");
const successHandler = require("../../helpers/successHandler");
const errorHandler = require("../../helpers/errorHandler");

const get_accounts = async(req, res) => {
  try {
    coinbaseClient.getAccounts({}, function(err, accounts) {
      if (!err) {
        res.status(200).json(successHandler({ data: accounts }))
      } else {
        res.status(400).json(errorHandler({ status: 400, error: true, message: err.message || 'Error getting accounts' }))
      }
    });
  } catch (err) {
    res.status(500).json(errorHandler({ error: true }))
  }
}

module.exports = get_accounts;
