const chalk = require('chalk');
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const { takeAction, getTableData } = require('../../services/mj_smartcontract');
const { responseHandler, errorHandler } = require("./responseHandler");

//GET_TABLE
exports.GET_TABLE = async (req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await getTableData(id)
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
      const transaction = await takeAction('mhlinitialze', { id })
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
      const transaction = await takeAction('mhladdbet', { id, quantity })
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
      const transaction = await takeAction('mhlstartbet', { id })
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
      const transaction = await takeAction('mhlresetbet', { id })
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
      const transaction = await takeAction('mhlplayhilo', { id, option })
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
      const transaction = await takeAction('mhldscrdtile', { id, idx })
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
      const transaction = await takeAction('mhldclrkong', { id, idx })
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
      const transaction = await takeAction('mhldclrwnhnd', { id })
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
        const transaction = await takeAction('mhlend', { id })
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
  // exports.RESET_GAME = async (req, res) => {
  //   const { id } = req.body
  //   if (!arrayHasUndefined([id])) {
  //     try {
  //       const transaction = await takeAction('endgame', { id })
  //       const { code, responseData } = responseHandler(transaction, 'MJ_ACTION_RESET_GAME')
  //       return res.status(code).json({ ...responseData })
  //     } catch (error) {
  //       console.log(chalk.red(err))
  //       const errorResponse = errorHandler(err)
  //       return res.status(errorResponse.code).json({ ...errorResponse })
  //     }
  //   } else {
  //     const errorResponse = errorHandler(null, true, "id")
  //     return res.status(errorResponse.code).json({ ...errorResponse })
  //   }
  // }

  //GET_ALL_USERS_TABLE

  //WITHDRAW_TOKEN
  exports.WITHDRAW_TOKEN = async (req, res) => {
    const { id } = req.body
    if (!arrayHasUndefined([id])) {
      try {
        const transaction = await takeAction('mhlwithdraw', { id })
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
        const transaction = await takeAction('mhlwintrnsfr', { id })
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


