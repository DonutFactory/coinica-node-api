const chalk = require('chalk');
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const { takeAction, getTableData } = require('../../services/smartcontract_api');
const { responseHandler, errorHandler } = require("./responseHandler");

const GAME_NAME = 'treasurehunt'

exports.TH_ACTION_GET_USER_DATA = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await getTableData(GAME_NAME, id)
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_GET_USER_DATA')
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

exports.TH_ACTION_GAME_START = async(req, res) => {
  const { id, quantity } = req.body
  if (!arrayHasUndefined([id, quantity])) {
    try {
      const transaction = await takeAction('gamestart', GAME_NAME, { id, quantity })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_GAME_START')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, quantity")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.TH_ACTION_WITHDRAW_GAME = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('withdraw', GAME_NAME, { id })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_WITHDRAW_GAME')
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

exports.TH_ACTION_INITIALIZE_GAME = async(req, res) => {
  const { id, username } = req.body
  if (!arrayHasUndefined([id, username])) {
    try {
      const transaction = await takeAction('initialize', GAME_NAME, { id, username })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_INITIALIZE_GAME')
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

exports.TH_ACTION_REMOVE_EXISTING_GAME = async(req, res) => {
  const { id, username } = req.body
  if (!arrayHasUndefined([id, username])) {
    try {
      const transaction = await takeAction('end', GAME_NAME, { id, username })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_REMOVE_EXISTING_GAME')
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

exports.TH_ACTION_SET_GAME_PANEL = async(req, res) => {
  const { id, username } = req.body
  const panelset = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  if (!arrayHasUndefined([id, username])) {
    try {
      const transaction = await takeAction('setpanel', GAME_NAME, { id, username, panelset })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_SET_GAME_PANEL')
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

exports.TH_ACTION_SET_DESTINATION = async(req, res) => {
  const { id, username, destination } = req.body
  if (!arrayHasUndefined([id, username, destination])) {
    try {
      const transaction = await takeAction('destination', GAME_NAME, { id, username, destination })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_SET_DESTINATION')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, username, destination")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.TH_ACTION_SET_ENEMY = async(req, res) => {
  const { id, username, enemy_count } = req.body
  if (!arrayHasUndefined([id, username, enemy_count])) {
    if (+enemy_count < 1 || +enemy_count > 15) {
      const errorResponse = errorHandler(null, true, "enemy_count must be set between 1 - 15")
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
    try {
      const transaction = await takeAction('setenemy', GAME_NAME, { id, username, enemy_count })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_SET_ENEMY')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, username, enemy_count")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.TH_ACTION_OPEN_TILE = async(req, res) => {
  const { id, username, index } = req.body
  if (!arrayHasUndefined([id, username, index])) {
    try {
      const transaction = await takeAction('opentile', GAME_NAME, { id, username, index })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_OPEN_TILE')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, username, index")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.TH_ACTION_AUTOPLAY_OPT = async(req, res) => {
  const { id, username, panelset } = req.body
  if (!arrayHasUndefined([id, username, panelset])) {
    try {
      const transaction = await takeAction('autoplay', GAME_NAME, { id, username, panelset })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_AUTOPLAY_OPT')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, username, panelset")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};
