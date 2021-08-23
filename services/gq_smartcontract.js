const { Api, JsonRpc } = require('eosjs');
const chalk = require('chalk');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const EOS_PRIVATE_KEY = process.env.MAIN_EOS_PRIVATE_KEY || "";
const MAIN_EOS_CONTRACT_NAME = process.env.MAIN_EOS_CONTRACT_NAME || "";
const EOS_SERVER_PROTOCOL = process.env.MAIN_EOS_PROTOCOL || "http";
const EOS_SERVER_HOST = process.env.MAIN_EOS_HOST;
const EOS_SERVER_PORT = process.env.MAIN_EOS_PORT;
const GQ_MAIN_TABLE = process.env.MAIN_EOS_GQ_TABLE;

const eosServer = `${EOS_SERVER_PROTOCOL}://${EOS_SERVER_HOST}:${EOS_SERVER_PORT}`;
const signatureProvider = new JsSignatureProvider([EOS_PRIVATE_KEY]);
const rpc = new JsonRpc(eosServer, { fetch })
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

exports.queryTableData = async (options = {}) => {
  console.log(`executing action: ***( queryTableData )*** options: `, options)
  console.log({ eosServer })
  try {
    const table = await rpc.get_table_rows({
      ...options,
      json: true,
      code: MAIN_EOS_CONTRACT_NAME,
      scope: MAIN_EOS_CONTRACT_NAME,
      table: GQ_MAIN_TABLE,
    });

    if (table && table.rows.length > 0) {
      return table.rows
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

exports.getTableData = async (id) => {
  console.log(`executing action: ***( get user table data )*** user: `, id)
  console.log({ eosServer })
  try {
    const table = await rpc.get_table_rows({
      json: true,
      code: MAIN_EOS_CONTRACT_NAME,
      scope: MAIN_EOS_CONTRACT_NAME,
      table: GQ_MAIN_TABLE,
      limit: 1,
      lower_bound: id,
    });

    console.log({ table })

    if (table && table.rows.length > 0 && table.rows[0].id === id) {
      return table.rows[0]
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

exports.takeAction = async (action, data) => {
  console.log(`executing action: ***( ${action} )*** with data: `, data)
  console.log({ eosServer })
  try {
    const result = await api.transact({
      actions: [{
        account: MAIN_EOS_CONTRACT_NAME,
        name: action,
        authorization: [{
          actor: MAIN_EOS_CONTRACT_NAME,
          permission: 'active',
        }],
        data
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    console.log(chalk.green('ACTION RESULT: '), result)

    return {
      ...result,
      isError: false
    };
  } catch (error) {
    console.log(chalk.red('ACTION ERROR: '), error)
    return {
      ...error,
      isError: true
    }
  }
}
