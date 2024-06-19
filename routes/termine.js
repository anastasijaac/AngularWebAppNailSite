const express = require('express');
const router = express.Router();
const termineController = require('../controllers/termine.controller');

router.get('/', termineController.getAllTermine);
router.post('/', termineController.createTermin);

module.exports = router;
