const express = require('express');
const router = express.Router();

router.get('/', (_, res) => {
  res.send('EGSNET NODE SERVER ' + process.env.NODE_ENV);
});

module.exports = router;
