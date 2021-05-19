const { coinbaseClient } = require("../../services/coinbaseClient");
const errorHandler = require("../../helpers/errorHandler");
const successHandler = require("../../helpers/successHandler");
const paramValidator = require("../../helpers/paramValidator");

const get_addresses = async(req, res) => {
  const { id } = req.body;
  const { isValid, message } = paramValidator({ id })
  if (isValid) {
    try {
      coinbaseClient.getAccount(id, function(err, account) {
        if (err) {
          res.status(400).json(errorHandler({ status: 400, message: 'Invalid id or id not found' }))
        } else {
          account.getAddresses({}, function(err, addresses) {
            if (err) {
              res.status(400).json(errorHandler({ status: 400, message: 'Error getting addresses' }))
            } else {
              res.status(200).json(errorHandler({ data: addresses }))
            }
          });
        }
      });
    } catch (err) {
      res.status(500).json(errorHandler({ message: err.message || 'Internal server error' }))
    }
  } else {
    res.status(400).json(errorHandler({ status: 400, message }))
  }
}

module.exports = get_addresses;
