const etherscan = require("etherscan-api");
const InputDataDecoder = require("ethereum-input-data-decoder");
const usdc_abi = require("../config/usdc_abi.json");
const web3 = require("web3");
const web3Utils = web3.utils;

const IS_DEV = process.env.NODE_ENV !== "production";
const API_KEY = process.env.ETHERSCAN_API_KEY;
const CHAIN = IS_DEV ? process.env.ETHERSCAN_TEST_NET : "";

const api = etherscan.init(API_KEY);
const decoder_usdc = new InputDataDecoder(usdc_abi);

exports.eth_getTransactionByHash = async ({ txhash, currency }) => {
  try {
    let decodedData = {};
    const response = await api.proxy.eth_getTransactionByHash(txhash);

    if (!response.result) {
      return response;
    }

    // Note: can decode only if transaction is transfer/deposit
    switch (currency.toUpperCase()) {
      case "USDC":
        decodedInputData = decoder_usdc.decodeData(response.result.input);

        // Format token value, that support 6 decimal. Ex: usdc
        // https://web3js.readthedocs.io/en/v1.3.4/web3-utils.html#fromwei
        tokenValue = web3Utils.fromWei(
          web3Utils.BN(decodedInputData.inputs[1]).toString(),
          "mwei"
        );

        decodedData = {
          to: "0x" + decodedInputData.inputs[0],
          value: tokenValue,
        };
        break;

      case "ETH":
        etherValue = web3Utils.fromWei(
          web3Utils.toBN(response.result.value).toString(),
          "ether"
        );

        decodedData = {
          to: response.result.to,
          value: etherValue,
        };
        break;
    }

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
