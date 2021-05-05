const chalk = require('chalk');
const generateKeyPairs = require("../../../helpers/key_pairs_generator");

module.exports = async(req, res) => {
  const { coin } = req.body;
  const is_valid_coin = validateCoinType(coin)
  try {
    if (is_valid_coin) {
      const data = generateKeyPairs(coin)
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
  const coinToGenerate = (type + '').toLowerCase()
  if (
    coinToGenerate === 'btc' ||
    coinToGenerate === 'eth' ||
    coinToGenerate === 'usdt' ||
    coinToGenerate === 'usdc'
  ) { return true }

  return false
}
