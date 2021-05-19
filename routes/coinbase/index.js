const express = require('express');
const router = express.Router();
const get_accounts = require("../../controllers/coinbase/get_accounts")
const get_account = require("../../controllers/coinbase/get_account")
const create_account = require("../../controllers/coinbase/create_account")
const create_address = require("../../controllers/coinbase/create_address")
const get_addresses = require("../../controllers/coinbase/get_addresses")
const get_address = require("../../controllers/coinbase/get_address")

// COINBASE API
router.get('/', (_, res) => res.send('EGS COINBASE API'));
router.post('/get_accounts', get_accounts);
router.post('/get_account', get_account);
router.post('/create_account', create_account);
router.post('/create_address', create_address);
router.post('/get_addresses', get_addresses);
router.post('/get_address', get_address);

module.exports = router;
