const {
  ADD_LIFE,
  BATTLE_RESULT,
  ELIMINATE,
  GEN_CHAR,
  GET_TABLE_ROWS,
} = require('../../controllers/ghostquest');
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => res.send('EGSNET GHOSTQUEST ROUTES'))
router.post('/gen_char', GEN_CHAR)
router.post('/add_life', ADD_LIFE)
router.post('/get_table', GET_TABLE_ROWS)
router.post('/eliminate', ELIMINATE)
router.post('/battle_result', BATTLE_RESULT)

module.exports = router
