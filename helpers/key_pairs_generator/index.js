const bitcoin_generator = require("./bitcoin_generator");
const ethereum_generator = require("./ethereum_generator");
const usdc_generator = require("./usdc_generator");

module.exports = (coin) => {
  if (coin === 'btc') {
    const { address, privateKey, publicKey } = bitcoin_generator()
    return {
      currency: "BTC",
      address,
      privateKey,
      publicKey
    };
  } else if (coin === 'eth') {
    const { address, privateKey, publicKey } = ethereum_generator()
    return {
      currency: "ETH",
      address,
      privateKey,
      publicKey
    };
  } else if (coin === 'usdt') {
    //
  } else if (coin === 'usdc') {
    const { address, privateKey, publicKey } = usdc_generator()
    return {
      currency: "USDC",
      address,
      privateKey,
      publicKey
    };
  } else { // IF NO COIN GENERATOR FOUND
    return null
  }
}
