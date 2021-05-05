const bitcoin_generator = require("./bitcoin_generator");

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
    //
  } else if (coin === 'usdt') {
    //
  } else if (coin === 'usdc') {
    //
  } else { // IF NO COIN GENERATOR FOUND
    return null
  }
}
