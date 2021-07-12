const chalk = require('chalk');
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const { takeAction, getTableData, queryTableData } = require('../../services/smartcontract_api');
const { responseHandler, errorHandler } = require("./responseHandler");

const GAME_NAME = process.env.EOS_GQ_CONTRACT_NAME;

exports.GQ_ACTION_TABLE_QUERY = async(req, res) => {
  const { options } = req.body
  if (!arrayHasUndefined([options])) {
    try {
      const transaction = await queryTableData(GAME_NAME, options)
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_TABLE_QUERY')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "options")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_GET_USER_DATA = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await getTableData(GAME_NAME, id)
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_GET_USER_DATA')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_INITIALIZE_GAME = async(req, res) => {
  const { id, username } = req.body
  if (!arrayHasUndefined([id, username])) {
    try {
      const transaction = await takeAction('initialize', GAME_NAME, { id, username })
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_INITIALIZE_GAME')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, username")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_SUMMON_GHOST = async(req, res) => {
  const { id, username, quantity, limit } = req.body
  if (!arrayHasUndefined([id, username, quantity, limit])) {
    try {
      const transaction = await takeAction('genchar', GAME_NAME, { id, username, quantity, limit })
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_SUMMON_GHOST')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, username, quantity, limit")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_ADD_LIFE = async(req, res) => {
  const { id, key } = req.body
  if (!arrayHasUndefined([id, key])) {
    try {
      const transaction = await takeAction('addlife', GAME_NAME, { id, key, quantity: 1 })
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_ADD_LIFE')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, key")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_ELIMINATE_GHOST = async(req, res) => {
  const { id, key } = req.body
  if (!arrayHasUndefined([id, key])) {
    try {
      const transaction = await takeAction('eliminate', GAME_NAME, { id, key })
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_ELIMINATE_GHOST')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, key")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_WITHDRAW_GHOST = async(req, res) => {
  const { id, key } = req.body
  if (!arrayHasUndefined([id, key])) {
    try {
      const transaction = await takeAction('withdraw', GAME_NAME, { id, key })
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_WITHDRAW_GHOST')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, key")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.GQ_ACTION_BATTLE_RESULT = async(req, res) => {
  const { gameid, winner, loser } = req.body
  if (!arrayHasUndefined([gameid, winner, loser])) {
    try {
      const transaction = await takeAction('battleresult', GAME_NAME, { gameid, winner, loser })
      const { code, responseData } = responseHandler(transaction, 'GQ_ACTION_BATTLE_RESULT')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "gameid, winner, loser")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};
