const Web3EthAccounts = require('web3-eth-accounts');

module.exports = () => {
  const account = new Web3EthAccounts();
  const keyPair = account.create();
  const address = JSON.parse(JSON.stringify(keyPair.address));
  const privateKey = JSON.parse(JSON.stringify(keyPair.privateKey));
  return { address, privateKey, publicKey: null };
}
