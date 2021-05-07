const bitcoin_generator = require("./bitcoin_generator");
const ethereum_generator = require("./ethereum_generator");

module.exports = (coin) => {
  if (coin === 'BTC') {
    const { address, privateKey, publicKey } = bitcoin_generator()
    return {
      currency: coin,
      address,
      privateKey,
      publicKey
    };
  } else if (coin === 'ETH' || coin === 'USDC') {
    const { address, privateKey, publicKey } = ethereum_generator()
    return {
      currency: coin,
      address,
      privateKey,
      publicKey
    };
  } else { // IF NO COIN GENERATOR FOUND
    return null
  }
}
