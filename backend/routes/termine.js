// routes/termine.js
const express = require('express');
const router = express.Router();
const termineController = require('../controllers/termine.controller');

// Bestehende Routen
router.get('/', termineController.getAllTermine);
router.post('/', termineController.createTermin);

// Neue Route für verfügbare Mitarbeiter
router.get('/available-employees', termineController.getAvailableEmployees);

// Neue Route für Terminverfügbarkeit
router.post('/check-availability', termineController.checkTerminAvailability);

module.exports = router;
