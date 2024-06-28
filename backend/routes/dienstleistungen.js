const express = require('express');
const router = express.Router();
const dienstleistungenController = require('../controllers/dienstleistungen.controller');

router.get('/', dienstleistungenController.getAllDienstleistungen);

module.exports = router;
