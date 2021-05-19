const { coinbaseClient } = require("../../services/coinbaseClient");
const errorHandler = require("../../helpers/errorHandler");
const successHandler = require("../../helpers/successHandler");
const paramValidator = require("../../helpers/paramValidator");

const create_account = async(req, res) => {
  const { name } = req.body;
  const {isValid, message  } = paramValidator({ name })
  if (!isValid) {
    res.status(400).json(errorHandler({ status: 400, message }))
    return
  }

  try {
    coinbaseClient.createAccount({ name }, function(err, acct) {
      if (!err) {
        res.status(200).json(successHandler({ data: acct }))
      } else {
        res
        .status(400)
        .json(errorHandler({ status: 400, message: err.message || "Error creating account" }))
      }
    });
  } catch (err) {
    res
    .status(500)
    .json(errorHandler({ message: err.message || "Internal server error" }))
  }
}

module.exports = create_account;
