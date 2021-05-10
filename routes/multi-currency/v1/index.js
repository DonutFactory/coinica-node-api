const express = require('express');
const router = express.Router();
const coins = require('../../../controllers/multi-currency/v1/coins');
const supported_pairs = require('../../../controllers/multi-currency/v1/supported_pairs');
const supported_deposit_coins = require('../../../controllers/multi-currency/v1/supported_deposit_coins');
const limit = require("../../../controllers/multi-currency/v1/limit");
const genenrate_offer = require("../../../controllers/multi-currency/v1/genenrate_offer");
const make_order = require("../../../controllers/multi-currency/v1/make_order");
const order_status = require("../../../controllers/multi-currency/v1/order_status");
const orders_list = require("../../../controllers/multi-currency/v1/orders_list");
const generate_keypairs = require("../../../controllers/multi-currency/v1/generate_keypairs");

// COINSWITCH API
router.get('/', (_, res) => res.send('EGS MULTI CURRENCY API V1'));
router.post('/coins', coins);
router.post('/supported-pairs', supported_pairs);
router.post('/supported-deposit-coins', supported_deposit_coins);
router.post('/order', order_status);
router.post('/orders', orders_list);
router.post('/exchange-limit', limit);
router.post('/generate-offer', genenrate_offer);
router.post('/make-order', make_order);

// GENERATE KEY PAIRS
router.post('/generate_keypairs', generate_keypairs)

module.exports = router;
