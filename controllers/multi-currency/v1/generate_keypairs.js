const chalk = require('chalk');
const generateKeyPairs = require("../../../helpers/key_pairs_generator");

module.exports = async(req, res) => {
  const { coin } = req.body;
  const coinSymbol = validateCoinType(coin)
  try {
    if (coinSymbol) {
      const data = generateKeyPairs(coinSymbol)
      if (data) {
        res.status(200).json(data)
      } else {
        res.status(400).json(null)
      }
    } else {
      res.status(400).json(null)
    }
  } catch (e) {
    res.status(400).json(null)
    console.log(chalk.red('GENERATE KEY_PAIRS ERROR: ', e ))
  }
}

const validateCoinType = (type) => {
  const _c = (type + '').toUpperCase()
  if (_c === 'BTC' || _c === 'ETH' || _c === 'USDC') {
    return _c
  }
  return false
}
