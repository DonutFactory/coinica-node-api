const { coinbaseClient } = require("../../services/coinbaseClient");
const errorHandler = require("../../helpers/errorHandler");
const successHandler = require("../../helpers/successHandler");

const create_address = async(req, res) => {
  const { currency, name } = req.body;
  if (!currency || !name) {
    res.status(400).json(errorHandler({ status: 400, message: "currency and name is required" }))
  } else {
    const _currency = (currency + '').toUpperCase()
    if (isValidAsset(_currency)) {
      try {
        coinbaseClient.getAccounts({}, (err, accounts) => {
          if (!err) {
            if (accounts && accounts.length) {
              const account = accounts.find(account => account.currency === _currency)
              console.log({ account })
              account.createAddress({ name }, function(err, address) {
                if (!err) {
                  res.status(200).json(successHandler({ data: address }))
                } else {
                  res.status(400).json(errorHandler({ message: err }))
                }
              });
            } else {
              throw new Error("Error getting account");
            }
          } else {
            throw new Error("Error getting accounts");
          }
        });
      } catch (err) {
        res
        .status(500)
        .json(errorHandler({ message: "Internal server error" }))
      }
    } else {
      res.status(400).json(errorHandler({ status: 400, message: "invalid currency" }))
    }
  }
}

const isValidAsset = (currency) => {
  if (currency === 'BTC' || currency === 'EOS' || currency === 'ETH' || currency === 'USDC') return true
  return false
}

module.exports = create_address;
