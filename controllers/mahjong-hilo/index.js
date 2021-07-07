const chalk = require('chalk');
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const { takeAction, getTableData } = require('../../services/smartcontract_api');
const { responseHandler, errorHandler } = require("./responseHandler");

GAME_NAME = 'mahjonghilo'

//GET_TABLE
exports.GET_TABLE = async (req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await getTableData(GAME_NAME, id)
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_GET_USER_DATA')
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
}

//START_GAME
exports.START_GAME = async (req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('initialize', GAME_NAME, { id })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_START_GAME')
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
}

//ADD_BET
exports.ADD_BET = async (req, res) => {
  const { id, quantity } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('addbet', GAME_NAME, { id, quantity })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_BET_TOKEN')
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
}

//BET_TOKEN
exports.BET_TOKEN = async (req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('startbet', GAME_NAME, { id })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_BET_TOKEN')
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
}

//RESET_BET
exports.RESET_BET = async (req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('resetbet', GAME_NAME, { id })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_RESET_BET')
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
}

//PLAY_HILO
exports.PLAY_HILO = async (req, res) => {
  const { id, option } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('playhilo', GAME_NAME, { id, option })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_PLAY_HILO')
      return res.status(code).json({ ...responseData })
    } catch (error) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, option")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
}

//DISCARD_TILE
exports.DISCARD_TILE = async (req, res) => {
  const { id, idx } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('discardtile', GAME_NAME, { id, idx })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_DISCARD_TILE')
      return res.status(code).json({ ...responseData })
    } catch (error) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, idx")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
}

//DECLARE_KONG
exports.DECLARE_KONG = async (req, res) => {
  const { id, idx } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('dclrkong', GAME_NAME, { id, idx })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_DECLARE_KONG')
      return res.status(code).json({ ...responseData })
    } catch (error) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, idx[]")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
}

//DECLARE_WIN_HAND
exports.DECLARE_WIN_HAND = async (req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('dclrwinhand', GAME_NAME, { id })
      const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_DECLARE_WIN_HAND')
      return res.status(code).json({ ...responseData })
    } catch (error) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
}

  //END
  exports.END_GAME = async (req, res) => {
    const { id } = req.body
    if (!arrayHasUndefined([id])) {
      try {
        const transaction = await takeAction('end', GAME_NAME, { id })
        const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_END_GAME')
        return res.status(code).json({ ...responseData })
      } catch (error) {
        console.log(chalk.red(err))
        const errorResponse = errorHandler(err)
        return res.status(errorResponse.code).json({ ...errorResponse })
      }
    } else {
      const errorResponse = errorHandler(null, true, "id")
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  }

  //RESET_GAME
  exports.RESET_GAME = async (req, res) => {
    const { id } = req.body
    if (!arrayHasUndefined([id])) {
      try {
        const transaction = await takeAction('endgame', GAME_NAME, { id })
        const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_RESET_GAME')
        return res.status(code).json({ ...responseData })
      } catch (error) {
        console.log(chalk.red(err))
        const errorResponse = errorHandler(err)
        return res.status(errorResponse.code).json({ ...errorResponse })
      }
    } else {
      const errorResponse = errorHandler(null, true, "id")
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  }

  //GET_ALL_USERS_TABLE

  //WITHDRAW_TOKEN
  exports.WITHDRAW_TOKEN = async (req, res) => {
    const { id } = req.body
    if (!arrayHasUndefined([id])) {
      try {
        const transaction = await takeAction('withdraw', GAME_NAME, { id })
        const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_WITHDRAW_TOKEN')
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
  }

  //TRANSFER_TOKEN
  exports.TRANSFER_TOKEN = async (req, res) => {
    const { id } = req.body
    if (!arrayHasUndefined([id])) {
      try {
        const transaction = await takeAction('wintransfer', GAME_NAME, { id })
        const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_TRANSFER_TOKEN')
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
  }


