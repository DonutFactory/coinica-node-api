const { START_GAME, END_GAME, RESET_GAME, PLAY_HILO, DECLARE_KONG, DECLARE_WIN_HAND, DISCARD_TILE , TRANSFER_TOKEN, WITHDRAW_TOKEN, GET_TABLE, BET_TOKEN, ADD_BET, RESET_BET} = require('../../controllers/mahjong-hilo');
const express = require('express');
const router = express.Router();

router.get('/', (_, res) => res.send('EGSNET MAHJONG HI-LO ROUTES'))
router.post('/get-table', GET_TABLE)
router.post('/withdraw-token', WITHDRAW_TOKEN)
router.post('/transfer-token', TRANSFER_TOKEN)
router.post('/bet-token', BET_TOKEN)
router.post('/addbet', ADD_BET)
router.post('/end', END_GAME)
router.post('/reset', RESET_GAME)
router.post('/start', START_GAME)
router.post('/play-hilo', PLAY_HILO)
router.post('/discard-tile', DISCARD_TILE)
router.post('/declare-kong', DECLARE_KONG)
router.post('/declare-win-hand', DECLARE_WIN_HAND)
router.post('/reset-bet', RESET_BET)


module.exports = router
