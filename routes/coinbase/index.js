const express = require('express');
const router = express.Router();
const get_accounts = require("../../controllers/coinbase/get_accounts")
const create_account = require("../../controllers/coinbase/create_account")
const create_address = require("../../controllers/coinbase/create_address")
const list_addresses = require("../../controllers/coinbase/list_addresses")

// COINBASE API
router.get('/', (_, res) => res.send('EGS COINBASE API'));
router.get('/get_accounts', get_accounts);
router.post('/create_account', create_account);
router.post('/create_address', create_address);
router.post('/list_addresses', list_addresses);

module.exports = router;
