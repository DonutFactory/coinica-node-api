const { coinbaseClient } = require("../../services/coinbaseClient");
const errorHandler = require("../../helpers/errorHandler");
const successHandler = require("../../helpers/successHandler");
const paramValidator = require("../../helpers/paramValidator");

const get_address = async(req, res) => {
  const { account_id, address } = req.body;
  const { isValid, message } = paramValidator({ account_id, address })
  if (isValid) {
    try {
      coinbaseClient.getAccount(account_id, (err, account) => {
        if (!err) {
          account.getAddress(address, function(err, address_data) {
            if (!err) {
              res.status(200).json(successHandler({ data: address_data }))
            } else {
              res.status(400).json(errorHandler({ status: 400, message: 'Invalid id or id not found' }))
            }
          });
        } else {
          res.status(400).json(errorHandler({ status: 400, message: "Error getting accounts" }))
        }
      });
    } catch (err) {
      res.status(500).json(errorHandler({ message: 'Internal server error' }))
    }
  } else {
    res.status(400).json(errorHandler({ status: 400, message }))
  }
}

module.exports = get_address;
