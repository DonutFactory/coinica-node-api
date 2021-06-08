const etherscan = require("etherscan-api");
const Web3 = require("web3");
const { fromWei, toBN } = Web3.utils;

const IS_DEV = process.env.NODE_ENV === "development";
const API_KEY = process.env.ETHERSCAN_API_KEY;
const CHAIN = IS_DEV ? process.env.ETHERSCAN_TEST_NET : "";

const api = etherscan.init(API_KEY, CHAIN);

exports.eth_getTransactionByHash = async (txhash) => {
  try {
    const response = await api.proxy.eth_getTransactionByHash(txhash);

    if (!response.result) {
      return response;
    }

    etherValue = fromWei(toBN(response.result.value).toString());

    decodedData = {
      to: response.result.to,
      value: etherValue,
    };

    return {
      ...response,
      result: {
        ...response.result,
        decodedData,
      },
    };
  } catch (error) {
    throw error;
  }
};
