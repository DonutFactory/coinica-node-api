const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const EOS_PRIVATE_KEY = process.env.EOS_PRIVATE_KEY || "";
const EOS_GQ_CONTRACT_NAME = process.env.EOS_GQ_CONTRACT_NAME || "";
const EOS_SERVER_PROTOCOL = process.env.EOS_PROTOCOL || "http";
const EOS_SERVER_HOST = process.env.EOS_HOST;
const EOS_SERVER_PORT = process.env.EOS_PORT;

const eosServer = `${EOS_SERVER_PROTOCOL}://${EOS_SERVER_HOST}:${EOS_SERVER_PORT}`;
const signatureProvider = new JsSignatureProvider([EOS_PRIVATE_KEY]);
const rpc = new JsonRpc(eosServer, { fetch })
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

exports.GEN_CHAR = async(req, res) => {
  const { username, amount, battleLimit } = req.body
  if (username && amount && battleLimit) {
    try {
      const transaction = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: username,
            permission: 'active',
          }],
          data: {
            from: username,
            to: 'ghostquest',
            quantity: `${amount}.0000 EOS`,
            memo: `BTTL_LMT=${battleLimit}`
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200)
      res.send(transaction)
    } catch (err) {
      res.status(500)
      res.send({
        code: 500,
        error: true,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      message: 'Parameters required: username, amount, battleLimit'
    })
  }
};

exports.ADD_LIFE = async(req, res) => {
  const { username, ghost_id } = req.body
  if (username, ghost_id) {
    try {
      const transaction = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: username,
            permission: 'active',
          }],
          data: {
            from: 'user1',
            to: 'ghostquest',
            quantity: `1.0000 EOS`,
            memo: `ADD_LIFE=${ghost_id}`
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200)
      res.send(transaction)
    } catch (err) {
      res.status(500)
      res.send({
        code: 500,
        error: true,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      message: 'Parameters required: username, ghost_id'
    })
  }
};