const express = require('express');
const router = express.Router();
const tagesagendaController = require('../controllers/tagesagenda.controller');

router.get('/', tagesagendaController.getAllTagesagenda);
router.post('/', tagesagendaController.createTagesagenda);

module.exports = router;
