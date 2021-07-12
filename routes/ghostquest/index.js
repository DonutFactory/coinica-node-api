// const {
//   ADD_LIFE,
//   BATTLE_RESULT,
//   ELIMINATE,
//   GEN_CHAR,
//   GET_TABLE_ROWS,
// } = require('../../controllers/ghostquest');
const {
  GQ_ACTION_GET_USER_DATA,
  GQ_ACTION_TABLE_QUERY,
  GQ_ACTION_INITIALIZE_GAME,
  GQ_ACTION_SUMMON_GHOST,
  GQ_ACTION_ADD_LIFE,
  GQ_ACTION_ELIMINATE_GHOST,
  GQ_ACTION_WITHDRAW_GHOST,
  GQ_ACTION_BATTLE_RESULT,
} = require('../../controllers/ghostquest_v2');
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => res.send('EGSNET GHOSTQUEST ROUTES'))
// router.post('/gen_char', GEN_CHAR)
// router.post('/add_life', ADD_LIFE)
// router.post('/get_table', GET_TABLE_ROWS)
// router.post('/eliminate', ELIMINATE)
// router.post('/battle_result', BATTLE_RESULT)

router.post('/get_table', GQ_ACTION_GET_USER_DATA)
router.post('/query_table', GQ_ACTION_TABLE_QUERY)
router.post('/initialize', GQ_ACTION_INITIALIZE_GAME)
router.post('/summon_ghost', GQ_ACTION_SUMMON_GHOST)
router.post('/add_life', GQ_ACTION_ADD_LIFE)
router.post('/eliminate', GQ_ACTION_ELIMINATE_GHOST)
router.post('/withdraw', GQ_ACTION_WITHDRAW_GHOST)
router.post('/battle_result', GQ_ACTION_BATTLE_RESULT)

module.exports = router
