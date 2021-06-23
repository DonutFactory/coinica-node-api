const chalk = require('chalk');
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const { takeAction } = require('../../services/smartcontract_api');

exports.GAME_START = async(req, res) => {
  const { id, quantity } = req.body
  if (!arrayHasUndefined([id, quantity])) {
    try {
      const transaction = await takeAction('gamestart', 'treasurehunt', { id, quantity })
      res.status(200).json({
        code: 200,
        error: transaction.isError || false,
        data: transaction,
        message: 'gamestart_response'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500).json({
        code: 500,
        error: true,
        data: err.message || err.msg || err,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400).json({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: id, quantity'
    })
  }
};

exports.WITHDRAW = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('withdraw', 'treasurehunt', { id })
      res.status(200).json({
        code: 200,
        error: transaction.isError || false,
        data: transaction,
        message: 'withdraw_response'
      })
    } catch (err) {
      console.log(chalk.red(err))
      res.status(500).json({
        code: 500,
        error: true,
        data: err.message || err.msg || err,
        message: 'Internal Server Error'
      })
    }
  } else {
    res.status(400).json({
      code: 400,
      error: true,
      data: null,
      message: 'Parameters required: id'
    })
  }
};
