const chalk = require("chalk");

const { assets } = require("../../services/coincap");

exports.currencies = async (req, res) => {
  try {
    const { currencies } = req.body;
    console.log("list currency", currencies);

    const response = await assets(currencies);
    const result = response.data.data;

    return res.json(result);
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: error.message,
    });
  }
};
