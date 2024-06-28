const express = require('express');
const router = express.Router();
const termineController = require('../controllers/termine.controller');

// Bestehende Routen
router.get('/', termineController.getAllTermine);
router.post('/', termineController.createTermin);

// Neue Route für verfügbare Zeiten
router.get('/available', termineController.getAvailableTimes);

module.exports = router;
