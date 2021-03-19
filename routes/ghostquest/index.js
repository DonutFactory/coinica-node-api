const { GEN_CHAR, ADD_LIFE } = require('../../controllers/ghostquest');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('EGSNET GHOSTQUEST ROUTES'))
router.post('/genchar', GEN_CHAR)
router.post('/addlife', ADD_LIFE)

module.exports = router
