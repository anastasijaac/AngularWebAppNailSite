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

// Neue Route für Termine nach KundenID
router.get('/kunde/:kundenID', termineController.getTermineByKundenID);

// Neue Route für Termine nach MitarbeiterID und Datum
router.get('/mitarbeiter/:mitarbeiterID', termineController.getTermineByMitarbeiterID);


module.exports = router;
