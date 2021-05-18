const CoinbasePro = require('coinbase-pro');

const key = process.env.COINBASE_PRO_KEY;
const secret = process.env.COINBASE_PRO_SECRET_KEY;
const passphrase = '7muzmctkoam';

const apiURI = 'https://api.pro.coinbase.com';
const sandboxURI = 'https://api-public.sandbox.pro.coinbase.com';

const publicClient = new CoinbasePro.PublicClient();
const authClient = new CoinbasePro.AuthenticatedClient(
  key,
  secret,
  passphrase,
  apiURI
);

module.exports = {
  authClient,
  publicClient
}
