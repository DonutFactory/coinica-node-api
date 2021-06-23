const { GAME_START, WITHDRAW } = require('../../controllers/treasurehunt');
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => res.send('EGSNET TREASUREHUNT ROUTES'))
router.post('/gamestart', GAME_START)
router.post('/withdraw', WITHDRAW)

module.exports = router
