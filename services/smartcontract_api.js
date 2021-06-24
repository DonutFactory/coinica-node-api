const { Api, JsonRpc } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder

const EOS_PRIVATE_KEY = process.env.EOS_PRIVATE_KEY || "";
const EOS_TH_CONTRACT_NAME = process.env.EOS_TH_CONTRACT_NAME || "";
const EOS_GQ_CONTRACT_NAME = process.env.EOS_GQ_CONTRACT_NAME || "";
const EOS_MJ_CONTRACT_NAME = process.env.EOS_MJ_CONTRACT_NAME || "";
const EOS_SERVER_PROTOCOL = process.env.EOS_PROTOCOL || "http";
const EOS_SERVER_HOST = process.env.EOS_HOST;
const EOS_SERVER_PORT = process.env.EOS_PORT;

const eosServer = `${EOS_SERVER_PROTOCOL}://${EOS_SERVER_HOST}:${EOS_SERVER_PORT}`;
const signatureProvider = new JsSignatureProvider([EOS_PRIVATE_KEY]);
const rpc = new JsonRpc(eosServer, { fetch })
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

exports.getTableData = async (game = null, id) => {
  let contractName = "";

  try {
    console.log(`executing action in game ${game}: ***( get user table data )*** user: `, id)
    if ((game + "").toLowerCase() === 'treasurehunt') {
      contractName = EOS_TH_CONTRACT_NAME;
    } else if ((game + "").toLowerCase() === 'ghostquest') {
      contractName = EOS_GQ_CONTRACT_NAME
    } else if ((game + "").toLowerCase() === 'mahjonghilo') {
      contractName = EOS_MJ_CONTRACT_NAME
    } else {
      throw new Error("invalid game")
    }
  
    const table = await rpc.get_table_rows({
      json: true,
      code: contractName,
      scope: contractName,
      table: 'users',
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

exports.takeAction = async (action, game = null, data) => {
  let contractName = "";

  console.log(`executing action in game ${game}: ***( ${action} )*** with data: `, data,)
  try {
    if ((game + "").toLowerCase() === 'treasurehunt') {
      contractName = EOS_TH_CONTRACT_NAME;
    } else if ((game + "").toLowerCase() === 'ghostquest') {
      contractName = EOS_GQ_CONTRACT_NAME
    } else if ((game + "").toLowerCase() === 'mahjonghilo') {
      contractName = EOS_MJ_CONTRACT_NAME
    } else {
      throw new Error("invalid game")
    }

    const result = await api.transact({
      actions: [{
        account: contractName,
        name: action,
        authorization: [{
          actor: contractName,
          permission: 'active',
        }],
        data
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    return {
      ...result,
      isError: false
    };
  } catch (error) {
    return {
      ...error,
      isError: true
    }
  }
}
