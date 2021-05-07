const Wallet = require('ethereumjs-wallet')

module.exports = () => {
  const EthWallet = Wallet.default.generate();
  const address = EthWallet.getAddressString();
  const privateKey = EthWallet.getPrivateKeyString();
  const publicKey = EthWallet.getPublicKeyString();
  return { address, privateKey, publicKey };
}
