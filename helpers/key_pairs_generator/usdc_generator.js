const Web3EthAccounts = require('web3-eth-accounts');

module.exports = () => {
  const account = new Web3EthAccounts();
  const keyPair = account.create();
  const address = JSON.parse(JSON.stringify(keyPair.address));
  const privateKey = JSON.parse(JSON.stringify(keyPair.privateKey));
  const publicKey = account.privateKeyToAccount(privateKey);
  // const publicKey = JSON.parse(JSON.stringify(keyPair.publicKey));
  console.log({ publicKey })
  return { address, privateKey, publicKey };
}
