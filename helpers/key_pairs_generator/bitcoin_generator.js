const bitcoin = require("bitcoinjs-lib");

module.exports = () => {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const publicKey = keyPair.publicKey.toString("hex");
  const privateKey = keyPair.toWIF();

  return { address, privateKey, publicKey };
}
