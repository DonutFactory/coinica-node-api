var express = require("express");
var router = express.Router();

const { currencies } = require("../../controllers/coincap");
const validate = require("../../validation/coincap_validation");

router.get("/", (_, res) => res.send("EGS COINCAP API"));

router.post("/assets", validate.assets, currencies);

module.exports = router;
