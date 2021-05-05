const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  res.send('EGSNET NODE SERVER')
});

module.exports = router;
