const etherscan = require("etherscan-api");
const Web3 = require("web3");
const { fromWei, toBN, BN } = Web3.utils;

const IS_DEV = process.env.NODE_ENV === "development";
const API_KEY = process.env.ETHERSCAN_API_KEY;
const CHAIN = IS_DEV ? process.env.ETHERSCAN_TEST_NET : "";

const api = etherscan.init(API_KEY, CHAIN);

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID;
const INFURA_PRIVATE_KEY = process.env.INFURA_PROJECT_KEY;
const NETWORK_CHAIN = IS_DEV
  ? process.env.ROPSTEN_TESTNET
  : process.env.ETH_MAINNET;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://:${INFURA_PRIVATE_KEY}@${NETWORK_CHAIN}.infura.io/v3/${INFURA_PROJECT_ID}`
  )
);

exports.eth_getTransactionByHash = async ({ txhash, currency }) => {
  try {
    const response = await api.proxy.eth_getTransactionByHash(txhash);

    if (!response.result) {
      return response;
    }

    switch (currency.toUpperCase()) {
      case "USDC":
        const inputData = "0x" + response.result.input.slice(10);
        const decodedInputData = web3.eth.abi.decodeParameters(
          ["address", "uint256"],
          inputData
        );

        const tokenValue = fromWei(
          new BN(decodedInputData[1]).toString(),
          "mwei"
        );
        decodedData = {
          to: "0x" + decodedInputData[0],
          value: tokenValue,
        };
        break;
      case "ETH":
        const etherValue = fromWei(toBN(response.result.value).toString());

        decodedData = {
          to: response.result.to,
          value: etherValue,
        };
        break;

      default:
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
