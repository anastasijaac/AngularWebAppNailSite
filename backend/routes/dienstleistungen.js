const express = require('express');
const router = express.Router();
const dienstleistungenController = require('../controllers/dienstleistungen.controller');

router.get('/', dienstleistungenController.getAllDienstleistungen);
router.post('/', dienstleistungenController.createDienstleistung);

module.exports = router;
