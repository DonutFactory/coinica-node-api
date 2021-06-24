const axios = require("axios").default;

const baseUrl = process.env.COINCAP_BASE_URL;

exports.assets = async (currencies) => {
  try {
    const queryCurrencies =
      currencies && currencies.length ? `?ids=${currencies.join(",")}` : "";

    const result = await axios.get(`${baseUrl}/assets${queryCurrencies}`);

    return result;
  } catch (error) {
    throw error;
  }
};
