const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const chalk = require('chalk');

const EOS_PRIVATE_KEY = process.env.EOS_PRIVATE_KEY || "";
const EOS_GQ_CONTRACT_NAME = process.env.EOS_GQ_CONTRACT_NAME || "";
const EOS_SERVER_PROTOCOL = process.env.EOS_PROTOCOL || "http";
const EOS_SERVER_HOST = process.env.EOS_HOST;
const EOS_SERVER_PORT = process.env.EOS_PORT;

const eosServer = `${EOS_SERVER_PROTOCOL}://${EOS_SERVER_HOST}:${EOS_SERVER_PORT}`;
const signatureProvider = new JsSignatureProvider([EOS_PRIVATE_KEY]);
const rpc = new JsonRpc(eosServer, { fetch })
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

exports.GET_TABLE_ROWS = async(req, res) => {
  const {
    code,
    table,
    scope,
    index_position,
    key_type,
    encode_type,
    upper_bound,
    lower_bound,
    json,
    limit,
    show_payer
  } = req.body

  if (!arrayHasUndefined([code,
                          table,
                          scope,
                          index_position,
                          key_type,
                          encode_type,
                          upper_bound,
                          lower_bound,
                          json,
                          limit,
                         show_payer])) {
    try {
      const tableResponse = await rpc.get_table_rows({
        code,
        table,
        scope,
        index_position,
        key_type,
        encode_type,
        upper_bound,
        lower_bound,
        json,
        limit,
        show_payer
      });

      res.status(200)
      res.send({
        code: 200,
        error: false,
        data: { table: tableResponse },
        message: 'success'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500)
      res.send({
        code: 500,
        error: true,
        data: null,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: code,table,scope,index_position,key_type,encode_type,upper_bound,lower_bound,json,limit,show_payer'
    })
  }
}

exports.GEN_CHAR = async(req, res) => {
  const { id, quantity, limit } = req.body
  if (!arrayHasUndefined([id, quantity, limit])) {
    try {
      const transaction = await api.transact({
        actions: [{
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{
            actor: id,
            permission: 'active',
          }],
          data: {
            from: id,
            to: 'ghostquest',
            quantity: `${quantity}.0000 EOS`,
            memo: `BTTL_LMT=${limit}`
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200)
      res.send({
        code: 200,
        error: false,
        data: { transaction_id: transaction.transaction_id },
        message: 'success'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500)
      res.send({
        code: 500,
        error: true,
        data: null,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: id, quantity, limit'
    })
  }
};

exports.ADD_LIFE = async(req, res) => {
  const { username, ghost_id } = req.body
  if (!arrayHasUndefined([username, ghost_id])) {
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
            quantity: `1.0000 EOS`,
            memo: `ADD_LIFE=${ghost_id}`
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200)
      res.send({
        code: 200,
        error: false,
        data: { transaction_id: transaction.transaction_id },
        message: 'success'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500)
      res.send({
        code: 500,
        error: true,
        data: null,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: username, ghost_id'
    })
  }
};

exports.ELIMINATE = async(req, res) => {
  const { username, ghost_id } = req.body
  if (!arrayHasUndefined([username, ghost_id])) {
    try {
      const transaction = await api.transact({
        actions: [{
          account: EOS_GQ_CONTRACT_NAME,
          name: 'eliminate',
          authorization: [{
            actor: 'ghostquest',
            permission: 'active',
          }],
          data: {
            username,
            key: ghost_id
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200)
      res.send({
        code: 200,
        error: false,
        data: { transaction: transaction.transaction_id },
        message: 'success'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500)
      res.send({
        code: 500,
        error: true,
        data: err,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: username, ghost_id'
    })
  }
}

exports.BATTLE_RESULT = async(req, res) => {
  const { gameid, winner, loser } = req.body
  if (!arrayHasUndefined([gameid, winner, loser])) {
    try {
      const transaction = await api.transact({
        actions: [{
          account: EOS_GQ_CONTRACT_NAME,
          name: 'battleresult',
          authorization: [{
            actor: 'ghostquest',
            permission: 'active',
          }],
          data: {
            gameid,
            winner,
            loser
          }
        }]
      }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

      res.status(200)
      res.send({
        code: 200,
        error: false,
        data: { transaction: transaction.transaction_id },
        message: 'success'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500)
      res.send({
        code: 500,
        error: true,
        data: null,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400)
    res.send({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: gameid, winner, loser'
    })
  }
}