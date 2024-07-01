const express = require('express');
const router = express.Router();
const mitarbeiterController = require('../controllers/mitarbeiter.controller');

// Routen für Mitarbeiter
router.post('/login', mitarbeiterController.employeeLogin);
router.get('/', mitarbeiterController.getAllMitarbeiter);
router.post('/', mitarbeiterController.createMitarbeiter);

module.exports = router;
