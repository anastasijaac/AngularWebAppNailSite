const express = require('express');
const router = express.Router();
const terminzeitenController = require('../controllers/terminzeiten.controller');

router.get('/', terminzeitenController.getAllTerminzeiten);

module.exports = router;
