const Client = require('coinbase').Client;

const key = process.env.COINBASE_KEY;
const secret = process.env.COINBASE_SECRET_KEY;

const coinbaseClient = new Client({
  'apiKey': key,
  'apiSecret': secret,
  'strictSSL': false
});

module.exports = {
  coinbaseClient
}
    