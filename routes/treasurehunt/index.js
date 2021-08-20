const express = require('express');
const router = express.Router();
const {
  TH_ACTION_GET_USER_DATA,
  TH_ACTION_WITHDRAW_GAME,
  TH_ACTION_INITIALIZE_GAME,
  TH_ACTION_REMOVE_EXISTING_GAME,
  TH_ACTION_OPEN_TILE,
  TH_ACTION_AUTOPLAY_OPT,
} = require('../../controllers/treasurehunt');

router.get('/', (_, res) => res.send('EGSNET TREASUREHUNT ROUTES'))
router.post('/get_data', TH_ACTION_GET_USER_DATA)
router.post('/withdraw', TH_ACTION_WITHDRAW_GAME)
router.post('/initialize', TH_ACTION_INITIALIZE_GAME)
router.post('/end', TH_ACTION_REMOVE_EXISTING_GAME)
router.post('/opentile', TH_ACTION_OPEN_TILE)
router.post('/autoplay', TH_ACTION_AUTOPLAY_OPT)

module.exports = router
