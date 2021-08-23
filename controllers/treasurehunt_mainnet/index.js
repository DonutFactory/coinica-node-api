const chalk = require('chalk');
const arrayHasUndefined = require('../../helpers/arrayHasUndefined');
const { takeAction, getTableData } = require('../../services/th_smartcontract');
const { responseHandler, errorHandler } = require("./responseHandler");

exports.TH_ACTION_GET_USER_DATA = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await getTableData(id)
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

exports.TH_ACTION_WITHDRAW_GAME = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('thwithdraw', { id })
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
  const { id, destination, enemy_count, quantity } = req.body
  const panels = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('thinitialize', { id, destination, enemy_count, panels, quantity })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_INITIALIZE_GAME')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, destination, enemy_count, quantity")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.TH_ACTION_REMOVE_EXISTING_GAME = async(req, res) => {
  const { id } = req.body
  if (!arrayHasUndefined([id])) {
    try {
      const transaction = await takeAction('thend', { id })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_REMOVE_EXISTING_GAME')
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

exports.TH_ACTION_OPEN_TILE = async(req, res) => {
  const { id, index } = req.body
  if (!arrayHasUndefined([id, index])) {
    try {
      const transaction = await takeAction('thopentile', { id, index })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_OPEN_TILE')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, index")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};

exports.TH_ACTION_AUTOPLAY_OPT = async(req, res) => {
  const { id, panelset } = req.body
  if (!arrayHasUndefined([id, panelset])) {
    try {
      const transaction = await takeAction('thautoplay', { id, panelset })
      const { code, responseData } = responseHandler(transaction, 'TH_ACTION_AUTOPLAY_OPT')
      return res.status(code).json({ ...responseData })
    } catch (err) {
      console.log(chalk.red(err))
      const errorResponse = errorHandler(err)
      return res.status(errorResponse.code).json({ ...errorResponse })
    }
  } else {
    const errorResponse = errorHandler(null, true, "id, panelset")
    return res.status(errorResponse.code).json({ ...errorResponse })
  }
};
