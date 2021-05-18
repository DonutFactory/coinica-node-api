const { coinbaseClient } = require("../../services/coinbaseClient");
const errorHandler = require("../../helpers/errorHandler");
const successHandler = require("../../helpers/successHandler");

const list_addresses = async(req, res) => {
  const { currency } = req.body;
  if (!currency) {
    res.status(400).json(errorHandler({ status: 400, message: "currency is required" }))
  } else {
    const _currency = (currency + '').toUpperCase()
    if (isValidAsset(_currency)) {
      try {
        coinbaseClient.getAccount('4d564444-8dab-583b-8d22-164edbda8bdb', function(err, account) {
          account.getAddress("3K26gT2i2UjVcxFuRMw1WF8BzVJfGX4kj4", function(err, address) {
            console.log({ address, err });
          });
        });
        // coinbaseClient.getAccounts({}, (err, accounts) => {
        //   if (!err) {
        //     if (accounts && accounts.length) {
        //       const account = accounts.find(account => account.currency === _currency)
        //       console.log({ account })
        //       account.getAddresses(function(err, addresses) {
        //         if (!err) {
        //           res.status(200).json(successHandler({ data: addresses }))
        //         } else {
        //           throw new Error(err);
        //         }
        //       });
        //     } else {
        //       throw new Error("Error getting account");
        //     }
        //   } else {
        //     throw new Error("Error getting accounts");
        //   }
        // });
      } catch (err) {
        console.log({ err })
        res
        .status(500)
        .json(errorHandler({ message: err }))
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

module.exports = list_addresses;
